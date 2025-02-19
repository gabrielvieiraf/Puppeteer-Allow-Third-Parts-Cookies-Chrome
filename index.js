export class SitePermissionsManager {
    constructor(browser) {
        this.browser = browser;
    }

    async addAllowedSite(site) {
        let page = null;
        try {
            page = await this.browser.newPage();
            await page.setExtraHTTPHeaders({ DNT: "1" });
    
            await page.goto('chrome://settings/cookies');
    
            await page.evaluate(() => {
                function getElementInShadowRoot(root, selector) {
                    return root.shadowRoot ? root.shadowRoot.querySelector(selector) : null;
                }
    
                const settingsUI = document.querySelector('settings-ui');
                const main = getElementInShadowRoot(settingsUI, 'settings-main');
                const basicPage = getElementInShadowRoot(main, 'settings-basic-page');
                const privacyPage = getElementInShadowRoot(basicPage, 'settings-section settings-privacy-page');
                const cookiesPage = getElementInShadowRoot(privacyPage, 'settings-cookies-page');
                const siteList = getElementInShadowRoot(cookiesPage, '#allow3pcExceptionsList');
                const addButton = getElementInShadowRoot(siteList, '#addSite');

                addButton.click();
            });
        
            const settingsUI = await page.$('settings-ui');
            const main = await (await settingsUI.getProperty('shadowRoot')).asElement().$('settings-main');
            const basicPage = await (await main.getProperty('shadowRoot')).asElement().$('settings-basic-page');
            const privacyPage = await (await basicPage.getProperty('shadowRoot')).asElement().$('settings-section settings-privacy-page');
            const cookiesPage = await (await privacyPage.getProperty('shadowRoot')).asElement().$('settings-cookies-page');
            const siteList = await (await cookiesPage.getProperty('shadowRoot')).asElement().$('#allow3pcExceptionsList');
            const dialog = await (await siteList.getProperty('shadowRoot')).asElement().$('add-site-dialog');
            const crDialog = await (await dialog.getProperty('shadowRoot')).asElement().$('cr-dialog');
            const crInput = await crDialog.$('cr-input#site');
            const input = await (await crInput.getProperty('shadowRoot')).asElement().$('input');
            
            await input.focus();
            await input.click({ clickCount: 3 });
            await input.type(site);
                
            const buttonContainer = await crDialog.$('div[slot="button-container"]');
            const addButton = await buttonContainer.$('cr-button.action-button');
            
            const isDisabled = await addButton.evaluate(button => button.disabled);
            if (!isDisabled) {
                await addButton.click();
            } else {
                throw new Error('Botão de adicionar está desabilitado.');
            }
            
            if (page) {
                await page.close();
            }
            
            return true;
        } catch (error) {
            console.error('Error adding allowed site:', error);
            if (page) {
                await page.close().catch(() => {});
            }
            return false;
        }
    }
}
