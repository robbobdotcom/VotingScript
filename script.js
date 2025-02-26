document.addEventListener("DOMContentLoaded", async function() {
    await (async function() {
        const e = (e) => new Promise((t) => setTimeout(t, e));
        let t = new Map;
        const l = { "EAT & DRINK": ["COOKIES", "DESSERT", "FROZEN TREAT"], "HEALTH & BEAUTY": ["CHIROPRACTOR"], SHOPPING: ["PLACE TO BUY A GIFT"] },
              o = { "EAT & DRINK": "Chocolate Wishes and Treats", "HEALTH & BEAUTY": "Jason B Bowen Chiropractic", SHOPPING: "Chocolate Wishes and Treats" };
        
        let n = Array.from(document.querySelectorAll(".card-title"));

        for (let r = 0; r < n.length; r++) {
            n = Array.from(document.querySelectorAll(".card-title"));
            if (r >= n.length) break;
            let c = n[r], i = c.innerText.trim();
            if (!l[i]) continue;
            t.has(i) || t.set(i, new Set);
            console.log(`📂 Entering Main Category: ${i}`);
            c.click();
            await e(100);
            let a = Array.from(document.querySelectorAll(".card-title")), s = 0;

            while (s < a.length) {
                a = Array.from(document.querySelectorAll(".card-title"));
                if (s >= a.length) break;
                let r = a[s], c = r.innerText.trim();
                if (!l[i].includes(c) || t.get(i).has(c)) {
                    s++;
                    continue;
                }
                console.log(`🔹 Entering Subcategory: ${c}`);
                t.get(i).add(c);
                r.click();
                await e(750);
                let u = false;

                document.querySelectorAll("label.custom-control-label").forEach((e) => {
                    if (e.innerText.trim() === o[i]) {
                        e.previousElementSibling.click();
                        console.log(`✅ Clicked on '${o[i]}'`);
                        u = true;
                    }
                });

                await e(100);
                if (u) {
                    if ("SHOPPING" === i && "PLACE TO BUY A GIFT" === c) {
                        let t = document.querySelector('span[jhitranslate="nerusApp.nomineeSubcategory.modal.submit"]');
                        if (t) {
                            t.parentElement.click();
                            console.log("📝 Clicked 'Review and Cast Ballot'");
                            await e(200);
                            let l = document.querySelector("#submitBallotButton");
                            if (l) {
                                l.click();
                                console.log("🚀 Clicked 'Submit Ballot'");
                            }
                            return;
                        }
                    } else {
                        let t = document.querySelectorAll(".btn-dashboard")[2];
                        if (t) {
                            t.click();
                            console.log("🔄 Clicked 'Vote in another main category'");
                            await e(100);
                            n = Array.from(document.querySelectorAll(".card-title"));
                            let l = n.find((e) => e.innerText.trim() === i);
                            if (l) {
                                l.click();
                                await e(100);
                            }
                            a = Array.from(document.querySelectorAll(".card-title"));
                            s = 0;
                            continue;
                        }
                    }
                }

                let m = document.querySelector('span[jhitranslate="entity.action.back"]');
                if (m) {
                    console.log(`↩️ Returning from ${c}`);
                    m.parentElement.click();
                } else {
                    let e = document.querySelector('.breadcrumb-item a[href="javascript:void(0)"] span');
                    if (e) {
                        console.log(`🔙 Using breadcrumb to return from ${e.innerText.trim()}`);
                        e.parentElement.click();
                    }
                }

                await e(100);
                s++;
            }

            let u = document.querySelector('span[jhitranslate="entity.action.back"]');
            if (u) {
                console.log(`🔼 Exiting Main Category: ${i}`);
                u.parentElement.click();
            } else {
                let e = document.querySelector('.breadcrumb-item a[href="javascript:void(0)"] span');
                if (e) {
                    console.log("⬆️ Using breadcrumb to return to main category selection");
                    e.parentElement.click();
                }
            }

            await e(100);
        }

        console.log("✅ Finished navigating selected categories.");
    })();
});
