import { test, expect } from '@playwright/test';
//import fs from "fs";
import path from "path";



test('TO verify title', async ({ page }) => {
await page.goto(' https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
let title = await page.title();
let url = await page.url();
let expectedurl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
await expect(page).toHaveURL(expectedurl);
await expect(page).toHaveTitle("OrangeHRM");
}); 

test("TO verify login functionality", async({page})=>{
await page.goto(' https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder("Username").fill("Admin");
await page.getByPlaceholder("Password").fill("admin123");
await page .getByRole('button',{name: ' Login '}).click();
await expect(page.getByText('Dashboard').first()).toBeVisible();
});
 
test('dashboard verification',async({page})=>{
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder("Username").fill("Admin");
await page.getByPlaceholder("Password").fill("admin123");
await page .getByRole('button',{name: ' Login '}).click();
await expect(page.getByText('Dashboard').first()).toBeVisible();

await page.getByText("PIM").click();
//await page.l
await page.locator("div[role= 'row']").last().waitFor({state: 'visible'});
const count1 = await page.locator("div[role= 'row']").count();
console.log(count1);
//let name1 = await page.locator("div[role= 'row']").textContent()
//console.log(name1);
for(let i=0;i<count1;i++){
    if(
    await page.locator("div[role= 'row']").nth(i).textContent() == "0490"){
        await page.waitForTimeout(2000);
        await page.locator(".oxd-checkbox-wrapper").nth(i).check();
    //console.log(name1);
    }
}
await page.getByRole('button',{ name: " Add "}).click();
await page.locator(".oxd-text.oxd-text--h6.orangehrm-main-title").waitFor({state: 'visible'});
const text =await page.locator(".oxd-text.oxd-text--h6.orangehrm-main-title").textContent();
console.log(text);
expect(page.locator(".oxd-text.oxd-text--h6.orangehrm-main-title")).toHaveText("Add Employee");
await page.getByPlaceholder("First Name").fill("vandana");
await page.getByPlaceholder("Middle Name").fill("sudhakar");
await page.getByPlaceholder("Last Name").fill("bhoyar");
await page.getByRole('button',{ name: " Save "}).click();


})
test.only('to verify Recruitment',async({page})=> {
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder("Username").fill("Admin");
await page.getByPlaceholder("Password").fill("admin123");
await page .getByRole('button',{name: ' Login '}).click();
await expect(page.getByText('Dashboard').first()).toBeVisible();
await page.getByText("Recruitment").click();
await page.getByText(" Add ").click();
const candidateText = await page.getByText("Add Candidate").innerText();
console.log(candidateText);
expect(candidateText).toBe("Add Candidate");
await page.getByPlaceholder("First Name").fill('vandana');
await page.getByPlaceholder("Middle Name").fill('sudhakar');
await page.getByPlaceholder("Last Name").fill('bhoyar');
await page.locator('.oxd-select-text-input').click();
await page.locator('.oxd-select-dropdown').getByText('Software Engineer').click();
await page.getByPlaceholder('Type here').nth(0).fill('van@gmail.com');
await page.getByPlaceholder('Type here').nth(1).fill('8830930741');
//await page.locator(".oxd-file-button").setInputFiles('C:\\PlaywrightDemo\\tests\\resume\\Vandana_Bhoyar_SDET4.4_Resume.pdf');
//const filePath = "C:\\PlaywrightDemo\\tests\\resume\\Vandana_Bhoyar_SDET4.4_Resume.pdf";
//await page.locator("input.oxd-file-input").setInputFiles(filePath);
//console.log("Exists:", fs.existsSync(filePath));

const filePath = path.resolve(
  "tests",
  "resume",
  "Vandana_Bhoyar_SDET4.4_Resume.pdf"
);

console.log(filePath);

await page.locator("input.oxd-file-input").setInputFiles(filePath);
await page.getByPlaceholder('Enter comma seperated words...').fill('SDET, Automation, Manual');
await page.locator('.oxd-icon.bi-calendar.oxd-date-input-icon').click();
await page.locator('.oxd-calendar-date').getByText('15').click();
//await page.getByPlaceholder('dd-mm-yyyy').fill('24-07-2026');
await page.locator('.oxd-checkbox-input.oxd-checkbox-input--active').check();
await page.getByRole('button',{ name: " Save "}).click();
await page.getByText('Claim').click();
//await page.locator('.oxd-select-text-input').first().click();
//await page.locator('.oxd-select-text-input').first().selectOption('Travel Allowance');
await page.locator(".oxd-select-text-input").filter({
    hasText: "Travel Allowance"
}).click();


})  
// test('to test',async({page})=>{




// });