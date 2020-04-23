"use strict";

function statsMaker(data, nom, next) {
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
    AllStats.stats.push([]);
    var compteur = 0;

    data.forEach(function (d) {
        if (d.Geo == nom) {
            if (d.Statistiques.indexOf("el") >= 0) {
                var stat = new Object();
                stat.nom = d.Statistiques;
                stat.valeur = d.Valeur;
                stat.annee = d.PeriodeDeReference;
                if (isNaN(d.Valeur)){
                }
                else
                {
                    AllStats.stats[compteur].push(stat);
                }
            }
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