"""Run after npm run build: python tests/portfolio_project_navigation.py"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
import unittest

from playwright.sync_api import expect, sync_playwright


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


class ProjectNavigation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        dist = Path(__file__).resolve().parents[1] / 'dist'
        assert (dist / 'index.html').is_file(), 'Build the site before running this test.'
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=dist))
        Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.addClassCleanup(cls.server.server_close)
        cls.addClassCleanup(cls.server.shutdown)
        runtime = sync_playwright().start()
        cls.addClassCleanup(runtime.stop)
        cls.browser = runtime.chromium.launch()
        cls.addClassCleanup(cls.browser.close)

    def overview(self, width):
        page = self.browser.new_page(viewport={'width': width, 'height': 840})
        self.addCleanup(page.close)
        page.goto(f'http://127.0.0.1:{self.server.server_port}/#portfolio')
        return page

    def test_one_selection_is_enough_for_all_three_projects(self):
        for route, title in [('web-agency-bloom','Agency Bloom'),('web-belay','Belay'),('web-somnia','Somnia Library')]:
            with self.subTest(project=title):
                page = self.overview(1440)
                page.locator(f'.project-intro-link[href="#{route}"]').click()
                page.locator('.qa-launch').click()
                expect(page.locator('.qa-welcome')).to_contain_text(title, timeout=2000)
                page.locator('.qa-input-wrap textarea').fill('介绍一下这个项目')
                page.get_by_role('button', name='发送', exact=True).click()
                expect(page.locator('.qa-answer')).to_contain_text(title)
                sources = page.locator('.qa-sources')
                expect(sources).to_contain_text(title)
                expect(sources.locator('a')).to_have_count(0)

    def test_interviewer_can_click_or_type_the_belay_framework_question(self):
        page = self.overview(390)
        page.locator('.project-intro-link[href="#web-belay"]').click()
        page.locator('.qa-launch').click()
        page.locator('.qa-interview summary').click()
        page.get_by_role('button', name='作者用了什么框架实现的？').click()
        expect(page.locator('.qa-answer').last).to_contain_text('FastAPI')
        page.locator('.qa-input-wrap textarea').fill('这个项目的技术栈是什么？')
        page.get_by_role('button', name='发送', exact=True).click()
        expect(page.locator('.qa-answer').last).to_contain_text('JavaScript')
        expect(page.locator('.qa-turn')).to_have_count(2)

    def test_data_overview_sources_and_interviews_share_the_conversation(self):
        for route, title in [('data-athub','AtHub'),('data-visualization','公共数据可视化'),('data-energy','可持续数据中心选址')]:
            with self.subTest(project=title):
                page = self.browser.new_page(viewport={'width':390,'height':840})
                self.addCleanup(page.close)
                page.goto(f'http://127.0.0.1:{self.server.server_port}/#services')
                page.locator('.qa-launch').click()
                page.locator('.qa-samples button').first.click()
                page.locator(f'.qa-sources a[href="#{route}"]').click()
                page.wait_for_url(f'**/#{route}')
                page.locator('.qa-launch').click()
                expect(page.locator('.qa-context')).to_contain_text(title)
                expect(page.locator('.qa-turn')).to_have_count(1)
                expect(page.locator(f'.qa-sources a[href="#{route}"]')).to_have_count(0)
                page.locator('.qa-page-prompts').click()
                page.locator('.qa-interview summary').click()
                expect(page.locator('.qa-interview button')).to_have_count(3)
                page.locator('.qa-interview button').last.click()
                expect(page.locator('.qa-turn')).to_have_count(2)
                expect(page.locator('.qa-turn').last.locator('.qa-current-source')).to_contain_text(title)
                page.reload()
                page.locator('.qa-launch').click()
                expect(page.locator('.qa-turn')).to_have_count(2)

    def test_ux_overview_and_case_questions_on_mobile_and_desktop(self):
        for width, route, name in [(390,'XD-cupcakes','Cupcakes'),(1440,'XD-reverie','Reverie Reads'),(390,'XD-travel','Travel Discovery')]:
            with self.subTest(case=name):
                page = self.browser.new_page(viewport={'width':width,'height':840})
                self.addCleanup(page.close)
                page.goto(f'http://127.0.0.1:{self.server.server_port}/#XD')
                page.locator('.qa-launch').click()
                expect(page.locator('.qa-samples button')).to_have_count(3)
                page.locator('.qa-samples button').first.click()
                page.locator(f'.qa-sources a[href="#{route}"]').click()
                page.wait_for_url(f'**/#{route}')
                page.locator('.qa-launch').click()
                expect(page.locator('.qa-turn')).to_have_count(1)
                expect(page.locator('.qa-context')).to_contain_text(name)
                expect(page.locator('.qa-current-source')).to_contain_text(name)
                page.locator('.qa-page-prompts').click()
                page.locator('.qa-interview summary').click()
                expect(page.locator('.qa-interview button')).to_have_count(3)
                page.locator('.qa-interview button').first.click()
                expect(page.locator('.qa-turn').last.locator('.qa-current-source')).to_contain_text(name)
                page.reload()
                page.locator('.qa-launch').click()
                expect(page.locator('.qa-turn')).to_have_count(2)

    def test_data_overview_previews_can_be_explored_without_leaving_the_page(self):
        for width in (390,1440):
            with self.subTest(width=width):
                page = self.browser.new_page(viewport={'width':width,'height':840})
                self.addCleanup(page.close)
                page.goto(f'http://127.0.0.1:{self.server.server_port}/#services')
                cards = page.locator('.data-card')
                for index in (0,1):
                    preview = cards.nth(index).locator('.data-preview')
                    initial = preview.locator('img').get_attribute('src')
                    preview.locator('.data-preview-options button').nth(1).click()
                    expect(preview.locator('.data-preview-options button').nth(1)).to_have_attribute('aria-pressed','true')
                    self.assertNotEqual(preview.locator('img').get_attribute('src'),initial)
                    preview.locator('.data-preview-options button').nth(2).click()
                    expect(preview.locator('.data-preview-options button').nth(2)).to_have_attribute('aria-pressed','true')
                    self.assertTrue(page.url.endswith('#services'))
                energy = cards.nth(2)
                energy.get_by_role('button',name='03 成本约束').click()
                expect(energy.locator('.data-factor-copy')).to_contain_text('成本')
                self.assertTrue(page.url.endswith('#services'))
                self.assertTrue(page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
                energy.locator('.project-intro-link').click()
                page.wait_for_selector('#data-energy')
                expect(page.locator('.data-preview')).to_have_count(0)
                expect(page.locator('.data-chapters section')).to_have_count(3)

    def test_follow_source_once_preserving_history_and_other_project_links(self):
        page = self.overview(390)
        page.locator('.qa-launch').click()
        page.locator('.qa-samples button').first.click()
        page.locator('.qa-sources a[href="#web-belay"]').click()
        page.wait_for_url('**/#web-belay')
        page.locator('.qa-launch').click()
        expect(page.locator('.qa-turn')).to_have_count(1)
        expect(page.locator('.qa-sources a[href="#web-belay"]')).to_have_count(0,timeout=2000)
        page.locator('.qa-sources a[href="#web-agency-bloom"]').click()
        page.wait_for_url('**/#web-agency-bloom')
        page.locator('.qa-launch').click()
        expect(page.locator('.qa-sources a[href="#web-belay"]')).to_have_count(1)


if __name__ == '__main__':
    unittest.main()
