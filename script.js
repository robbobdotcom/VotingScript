async function navigateCategories() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let visitedCategories = new Map();

    const targetCategories = {
        "EAT & DRINK": ["COOKIES", "DESSERT", "FROZEN TREAT"],
        "HEALTH & BEAUTY": ["CHIROPRACTOR"],
        "SHOPPING": ["PLACE TO BUY A GIFT"]
    };

    const selectionNames = {
        "EAT & DRINK": "Chocolate Wishes and Treats",
        "HEALTH & BEAUTY": "Jason B Bowen Chiropractic",
        "SHOPPING": "Chocolate Wishes and Treats"
    };

    let mainCategories = Array.from(document.querySelectorAll('.card-title'));

    for (let categoryIndex = 0; categoryIndex < mainCategories.length; categoryIndex++) {
        mainCategories = Array.from(document.querySelectorAll('.card-title'));
        if (categoryIndex >= mainCategories.length) break;

        let category = mainCategories[categoryIndex];
        let categoryName = category.innerText.trim();

        if (!targetCategories[categoryName]) continue;

        if (!visitedCategories.has(categoryName)) {
            visitedCategories.set(categoryName, new Set());
        }

        console.log(`📂 Entering Main Category: ${categoryName}`);
        category.click();
        await delay(100);

        let subCategories = Array.from(document.querySelectorAll('.card-title'));
        let subIndex = 0;

        while (subIndex < subCategories.length) {
            subCategories = Array.from(document.querySelectorAll('.card-title'));
            if (subIndex >= subCategories.length) break;

            let subCategory = subCategories[subIndex];
            let subCategoryName = subCategory.innerText.trim();

            if (!targetCategories[categoryName].includes(subCategoryName) || visitedCategories.get(categoryName).has(subCategoryName)) {
                subIndex++;
                continue;
            }

            console.log(`🔹 Entering Subcategory: ${subCategoryName}`);
            visitedCategories.get(categoryName).add(subCategoryName);
            subCategory.click();
            await delay(750);

            let selectionMade = false;
            document.querySelectorAll('label.custom-control-label').forEach(label => {
                if (label.innerText.trim() === selectionNames[categoryName]) {
                    label.previousElementSibling.click();
                    console.log(`✅ Clicked on '${selectionNames[categoryName]}'`);
                    selectionMade = true;
                }
            });

            await delay(100);

            if (selectionMade) {
                if (categoryName === "SHOPPING" && subCategoryName === "PLACE TO BUY A GIFT") {
                    let reviewButton = document.querySelector('span[jhitranslate="nerusApp.nomineeSubcategory.modal.submit"]');
                    if (reviewButton) {
                        reviewButton.parentElement.click();
                        console.log("📝 Clicked 'Review and Cast Ballot'");
                        await delay(200);

                        let submitButton = document.querySelector('#submitBallotButton');
                        if (submitButton) {
                            submitButton.click();
                            console.log("🚀 Clicked 'Submit Ballot'");
                        }
                        return;
                    }
                } else {
                    let voteButton = document.querySelectorAll(".btn-dashboard")[2];
                    if (voteButton) {
                        voteButton.click();
                        console.log("🔄 Clicked 'Vote in another main category'");
                        await delay(100);

                        mainCategories = Array.from(document.querySelectorAll('.card-title'));
                        let mainCategoryToReenter = mainCategories.find(cat => cat.innerText.trim() === categoryName);
                        if (mainCategoryToReenter) {
                            mainCategoryToReenter.click();
                            await delay(100);
                        }

                        subCategories = Array.from(document.querySelectorAll('.card-title'));
                        subIndex = 0;
                        continue;
                    }
                }
            }

            let goBackButton = document.querySelector('span[jhitranslate="entity.action.back"]');
            if (goBackButton) {
                console.log(`↩️ Returning from ${subCategoryName}`);
                goBackButton.parentElement.click();
            } else {
                let breadcrumb = document.querySelector('.breadcrumb-item a[href="javascript:void(0)"] span');
                if (breadcrumb) {
                    console.log(`🔙 Using breadcrumb to return from ${breadcrumb.innerText.trim()}`);
                    breadcrumb.parentElement.click();
                }
            }

            await delay(100);
            subIndex++;
        }

        let returnToMain = document.querySelector('span[jhitranslate="entity.action.back"]');
        if (returnToMain) {
            console.log(`🔼 Exiting Main Category: ${categoryName}`);
            returnToMain.parentElement.click();
        } else {
            let mainBreadcrumb = document.querySelector('.breadcrumb-item a[href="javascript:void(0)"] span');
            if (mainBreadcrumb) {
                console.log(`⬆️ Using breadcrumb to return to main category selection`);
                mainBreadcrumb.parentElement.click();
            }
        }

        await delay(100);
    }

    console.log("✅ Finished navigating selected categories.");
}

navigateCategories();
