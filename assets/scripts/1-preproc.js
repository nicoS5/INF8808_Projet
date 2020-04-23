"use strict";

function statsMaker(data, nom, next) {
    const MAXSTAT = 16;
    const MINSTAT = 14;

    var AllStats = new Object();
    if (next == "provinces"){
        AllStats.country = nom;
        AllStats.provinces = [];
    }
    else if (next == "villes"){
        AllStats.province = nom;
        AllStats.villes = [];
    }
    else {
        AllStats.ville = nom;
    }
    AllStats.stats = [];
    for (var i=0; i<MAXSTAT; i++) {
        AllStats.stats.push([]);
    }

    const TBL1998 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const TBL2011 = [0, 1, 2, 14, 15, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    var compteur = 0;
    var compteurMax = MINSTAT;
    var tbl = TBL1998;

    data.forEach(function (d) {
        if (d.Geo == nom) {
            if (d.Statistiques.indexOf("el") >= 0) {
                /*if (nom.indexOf("Kingston") >= 0){
                    console.log(d.Valeur);
                }*/
                var stat = new Object();
                stat.nom = d.Statistiques;
                /*if (isNaN(d.Valeur)){
                    console.log("OK");
                    stat.valeur = 0;
                }*/
                //else {
                    stat.valeur = d.Valeur;
                //}
                stat.annee = d.PeriodeDeReference;
                if (isNaN(d.Valeur)){
                }
                else
                {
                    AllStats.stats[compteur].push(stat);
                }
            }
            /*compteur++;
            if (compteur == compteurMax) {
                compteur = 0;
            }

            if (d.PeriodeDeReference >= 2011) {
                compteurMax = MAXSTAT;
                tbl = TBL2011;
            } */
        /*if (d.Geo == nom) {
            var stat = new Object();
            stat.nom = d.Statistiques;
            stat.valeur = d.Valeur;
            stat.annee = d.PeriodeDeReference;
            AllStats.stats[tbl[compteur]].push(stat);

            compteur++;
            if (compteur == compteurMax) {
                compteur = 0;
            }

            if (d.PeriodeDeReference >= 2011) {
                compteurMax = MAXSTAT;
                tbl = TBL2011;
            }*/
        }
    });

    return(AllStats);
}

function dataParse(data) {
    data.forEach(function (d) {
        d.PeriodeDeReference = parseInt(d.PeriodeDeReference);
        d.Valeur = parseFloat(d.Valeur);
    });
}

function dataNames(data) {
    var names =[];
    data.forEach(function (d) {
        if (names.indexOf(d.Geo) === -1){
            names.push(d.Geo);
        }
    });
    var wrongNames = names.slice(40);
    var wrightNames = names.slice(0, 40);

    wrongNames.forEach(function (d) {
        var VIndex = d.indexOf(",");
        var province = d.slice(VIndex+2, d.length-8);
         var lastIndex = -1;
        wrightNames.forEach(function (d, i) {
            if (d.indexOf(province) >= 0) {
                lastIndex = i;
            }
        });
        if (lastIndex >= 0){
            wrightNames.splice(lastIndex, 0, d);
        }
    });
    return wrightNames;
}

function dataOrg(data, names) {
    var AllStats;
    var index = -1;
    names.forEach(function (d) {
        if (d == "Canada"){
            AllStats = statsMaker(data, d, "provinces")
        }
        else if (d.includes(",")){
            AllStats.provinces[index].villes.push(statsMaker(data, d,"none"));
        }
        else {
            AllStats.provinces.push(statsMaker(data, d, "villes"));
            index++;
        }
    });
    return AllStats;
}