
    (function () {
        let readystatecheck = setInterval(function () {
            if (document.readyState === 'complete') {
                clearInterval(readystatecheck);
                document.querySelector("#valider")
                    .addEventListener('click', initUi, false);
                document.querySelector("#pourcentage").addEventListener(
                    'input',
                    function(e){
                        document.querySelector("label[for='#pourcentage']").textContent=e.target.value+"%";
                    },
                    false
                )

            }
        }, 100)
           as

        function initUi() {
            let investissement, duree, retrait, retirer, pourcentage;
            investissement = document.querySelector("#montant").value;
            duree = document.querySelector("#duree").value;
            retrait = document.querySelector("#retrait").value;
            retirer = document.querySelector("#retirer").value;
            pourcentage = document.querySelector("#pourcentage").value;
            fieldsOk(document.querySelectorAll("input"));

            let solde = 0;
            let totalRetrait = 0;

            computeFields();
            function computeFields() {
                solde = +investissement;
                console.log('computing')
                for (let i = 0; i < duree; i++) {
                    solde += investissement * pourcentage / 100;
                    if (retirer) {
                        solde -= retrait;
                        totalRetrait += retrait;
                    }
                    investissement = solde;
                }
                updateUi();
            }
            function updateUi() {
                document.querySelector("#solde_compte").textContent = "Solde: " + solde.toLocaleString("fr-FR", { style: "currency", currency: "XOF" });
            }
            function fieldsOk(fields) {
                fields.forEach(field => {
                    if (!field || !field.value) {
                        field.classList.add("invalid");
                        return false;
                    }

                })
            }
        }
    }())
