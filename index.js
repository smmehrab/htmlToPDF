const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const prompt = require('prompt');

(async () => {
    try{
        var filePath;
        // For Taking File Path from CMD Prompt
        // var prompt_attributes = [{name: 'filePath'}];
        // prompt.start();
        // prompt.get(prompt_attributes, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }else {
        //         filePath = result.filePath;
        //         toPDF(filePath);
        //     }
        // });

        filePath = './input/input.html'
        toPDF(filePath);
    }catch(e){
        console.log(e);
    }
})();

async function toPDF(filePath){
        var inputHtml;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        inputHtml = fs.readFileSync(filePath, 'utf8');
        await page.setContent(inputHtml);
        await page.emulateMedia('screen');
        await page.pdf({
            path: './output/output.pdf',
            format: 'A4',
            printBackground: true
        });

        console.log('Successfully Coverted!');
        await browser.close();
        process.exit();
}