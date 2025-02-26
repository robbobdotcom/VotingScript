window.onload = async function() {
    if (!window.location.href.includes("votebocc.com")) {
        console.log("Script only runs on votebocc.com");
        return;
    }

    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let selectedCategories = new Map();
    const categories = {
        "EAT & DRINK": ["COOKIES", "DESSERT", "FROZEN TREAT"],
        "HEALTH & BEAUTY": ["CHIROPRACTOR"],
        "SHOPPING": ["PLACE TO BUY A GIFT"]
    };

    const votes = {
        "EAT & DRINK": "Chocolate Wishes and Treats",
        "HEALTH & BEAUTY": "Jason B Bowen Chiropractic",
        "SHOPPING": "Chocolate Wishes and Treats"
    };

    let mainCategories = Array.from(document.querySelectorAll(".card-title"));

    for (let i = 0; i < mainCategories.length; i++) {
        mainCategories = Array.from(document.querySelectorAll(".card-title"));
        if (i >= mainCategories.length) break;

        let mainCategory = mainCategories[i];
        let mainCategoryName = mainCategory.innerText.trim();

        if (!categories[mainCategoryName]) continue;

        if (!selectedCategories.has(mainCategoryName)) {
            selectedCategories.set(mainCategoryName, new Set());
        }

        console.log(`📂 Entering Main Category: ${mainCategoryName}`);
        mainCategory.click();
        await delay(100);

        let subCategories = Array.from(document.querySelectorAll(".card-title"));
        let subIndex = 0;

        while (subIndex < subCategories.length) {
            subCategories = Array.from(document.querySelectorAll(".card-title"));
            if (subIndex >= subCategories.length) break;

            let subCategory = subCategories[subIndex];
            let subCategoryName = subCategory.innerText.trim();

            if (!categories[mainCategoryName].includes(subCategoryName) || selectedCategories.get(mainCategoryName).has(subCategoryName)) {
                subIndex++;
                continue;
            }

            console.log(`🔹 Entering Subcategory: ${subCategoryName}`);
            selectedCategories.get(mainCategoryName).add(subCategoryName);
            subCategory.click();
            await delay(750);

            let voted = false;

            document.querySelectorAll("label.custom-control-label").forEach(label => {
                if (label.innerText.trim() === votes[mainCategoryName]) {
                    label.previousElementSibling.click();
                    console.log(`✅ Clicked on '${votes[mainCategoryName]}'`);
                    voted = true;
                }
            });

            await delay(100);

            if (voted) {
                if (mainCategoryName === "SHOPPING" && subCategoryName === "PLACE TO BUY A GIFT") {
                    let reviewButton = document.querySelector('span[jhitranslate="nerusApp.nomineeSubcategory.modal.submit"]');
                    if (reviewButton) {
                        reviewButton.parentElement.click();
                        console.log("📝 Clicked 'Review and Cast Ballot'");
                        await delay(200);
                        let submitButton = document.querySelector("#submitBallotButton");
                        if (submitButton) {
                            submitButton.click();
                            console.log("🚀 Clicked 'Submit Ballot'");
                        }
                        return;
                    }
                } else {
                    let backToCategories = document.querySelectorAll(".btn-dashboard")[2];
                    if (backToCategories) {
                        backToCategories.click();
                        console.log("🔄 Clicked 'Vote in another main category'");
                        await delay(100);
                        mainCategories = Array.from(document.querySelectorAll(".card-title"));
                        let reopenMainCategory = mainCategories.find(el => el.innerText.trim() === mainCategoryName);
                        if (reopenMainCategory) {
                            reopenMainCategory.click();
                            await delay(100);
                        }
                        subCategories = Array.from(document.querySelectorAll(".card-title"));
                        subIndex = 0;
                        continue;
                    }
                }
            }

            let backButton = document.querySelector('span[jhitranslate="entity.action.back"]');
            if (backButton) {
                console.log(`↩️ Returning from ${subCategoryName}`);
                backButton.parentElement.click();
            } else {
                let breadcrumbBack = document.querySelector('.breadcrumb-item a[href="javascript:void(0)"] span');
                if (breadcrumbBack) {
                    console.log(`🔙 Using breadcrumb to return from ${breadcrumbBack.innerText.trim()}`);
                    breadcrumbBack.parentElement.click();
                }
            }

            await delay(100);
            subIndex++;
        }

        let exitMainCategory = document.querySelector('span[jhitranslate="entity.action.back"]');
        if (exitMainCategory) {
            console.log(`🔼 Exiting Main Category: ${mainCategoryName}`);
            exitMainCategory.parentElement.click();
        } else {
            let breadcrumbExit = document.querySelector('.breadcrumb-item a[href="javascript:void(0)"] span');
            if (breadcrumbExit) {
                console.log("⬆️ Using breadcrumb to return to main category selection");
                breadcrumbExit.parentElement.click();
            }
        }

        await delay(100);
    }

    console.log("✅ Finished navigating selected categories.");
};
