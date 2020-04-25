"use strict";

function wafflePre(canvas, widthEcran, heightEcran, tailleWaffle) {
    canvas.append("text")
        .attr("class", "wafflePre")
        .attr("font-size", "%250")
        .text("= 1 000 cas de fraude")
        .attr("dx", widthEcran*0.5)
        .attr("dy", heightEcran*0.5);
    canvas.append("rect")
        .attr("class", "wafflePre")
        .attr("x", widthEcran*0.5 - tailleWaffle-10)
        .attr("y", heightEcran*0.5 - tailleWaffle/2-6)
        .attr("height", tailleWaffle)
        .attr("width", tailleWaffle)
        .attr("fill", "blue");
}

function waffleMaker(canvas, widthEcran, heightEcran, AllStats, waffleTaille) {
    var offsetX = widthEcran*0.05;
    AllStats.provinces.forEach(function (d, i) {
        var province = cleanProvince(d);

        canvas.append("rect")
            .attr("class", "Button_" + province)
            .attr("id", "rect_" + province)
            .attr("x", offsetX-10)
            .attr("y", heightEcran*0.07*(i+1) - 6)
            .attr("height", 40)
            .attr("width", 225)
            .attr("fill", "white")
            .attr("stroke", "black");
        canvas.append("text")
            .attr("class", "Button_" + province)
            .text(d.province)
            .attr("dx", offsetX)
            .attr("dy", heightEcran*0.07*(i+1) + heightEcran*0.02);

        var lenghtStat = d.stats[0].length;
        var valeur = d.stats[0][lenghtStat-1].valeur;
        var xComp = 0;
        var yComp = 0;
        while(valeur > 0){
            canvas.append("rect")
                .attr("class", "valeur_de_" + province)
                .attr("x", offsetX + 220 + xComp*(waffleTaille+4))
                .attr("y", 4 + heightEcran*0.07*(i+1) -(waffleTaille+4)/2 + (waffleTaille+4)*yComp)
                .attr("height", waffleTaille)
                .attr("width", waffleTaille)
                .attr("fill", "blue");
            valeur -= 1000;
            yComp++;
            if(yComp > 1){
                yComp = 0;
                xComp++;
            }
        }
    });
}

function waffleMaker2(canvas, widthEcran, heightEcran, province, waffleTaille) {
    province.villes.forEach(function (d, i) {
        var ville = cleanVille(d);

        canvas.append("rect")
            .attr("class", "Button_" + ville)
            .attr("id", "rect_" + ville)
            .attr("x", heightEcran*0.05 -10)
            .attr("y", heightEcran*0.07*(i+1) + heightEcran*0.2 - 25)
            .attr("height", 40)
            .attr("width", 370)
            .attr("fill", "white")
            .attr("stroke", "black");
        canvas.append("text")
            .attr("class", "Button_" + ville)
            .text(d.ville)
            .attr("dx", heightEcran*0.05)
            .attr("dy", heightEcran*0.07*(i+1) + heightEcran*0.2);

        var lenghtStat = d.stats[0].length;
        var valeur = d.stats[0][lenghtStat-1].valeur;
        var xComp = 0;
        var yComp = 0;
        while(valeur > 0){
            canvas.append("rect")
                .attr("class", "valeur_de_" + ville)
                .attr("x", heightEcran*0.05 + 370 + xComp*(waffleTaille+4))
                .attr("y", heightEcran*0.2 - 14.5 + heightEcran*0.07*(i+1) -(waffleTaille+4)/2 + (waffleTaille+4)*yComp)
                .attr("height", waffleTaille)
                .attr("width", waffleTaille)
                .attr("fill", "blue");
            valeur -= 1000;
            yComp++;
            if(yComp > 1){
                yComp = 0;
                xComp++;
            }
        }
    })
}