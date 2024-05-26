import { test, expect } from '@playwright/test';
import exp from 'constants';

test('test for dialogBox', async ({ page, context }) => {
  test.slow();
  await page.goto('https://testing.kriyadocs.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Kriyadocs | Login');

  await expect(page.locator('#username')).toBeVisible()
  await expect(page.locator('#password')).toBeVisible()
  await expect(page.locator('.loginButton a')).toBeVisible()

  await page.locator('#username').fill('princedaniel@kriyadocs.com')

  await page.locator('#password').fill('Happy_Author1')

  const responsePromise = page.waitForResponse('**/api/authenticate', { timeout: 30000 })

  await page.locator(`.loginButton a`).click()


  try {
    await page.locator('.btn.confirm').waitFor({ state: 'visible',timeout:3000})
    await page.locator('.btn.confirm').click()
  } catch (e) { }
  await page.waitForURL('https://testing.kriyadocs.com/dashboard')

  await page.waitForSelector('.card')

  await expect(page.locator('.card')).toHaveCount(68)

  await page.locator('.card:nth-child(8)').click()

  await page.waitForSelector('.nav-link.settings.nav_list1')

  await page.locator('#preloader').waitFor({ state:'hidden', timeout: 0 })
  //waiting for new page
  const pagePromise = context.waitForEvent('page')
  
  await page.locator('.nav-link.settings.nav_list1').click()
  
  const settingsPage = await pagePromise
  
  await settingsPage.locator('#preloader').waitFor({ state:'hidden', timeout: 0 })
  
  await settingsPage.locator('button', { hasText: 'WorkFlow' }).click()
  
  
  await settingsPage.locator('#preloader').waitFor({ state:'hidden', timeout: 0 })
  
  await settingsPage.locator('ul li').first().click()
  
  await settingsPage.locator('button',{hasText:'Edit settings'}).waitFor({ state:'visible', timeout: 0 })
  
  await settingsPage.locator('button',{hasText:'Edit settings'}).click()
  
  await settingsPage.locator('input[type="number"]').fill('20')

  await settingsPage.locator('ul li:nth-child(2)').click()

  expect(settingsPage.locator('.p-dialog')).toBeVisible()

});
