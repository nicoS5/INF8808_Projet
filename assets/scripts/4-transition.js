"use strict";

function cleanGraph1(widthEcran) {
    d3.select("#FirstCanvas")
        .transition()
        .duration(500)
        .attr("transform","translate(" + widthEcran*2.1 + ",0)")
        .remove();
}

function moveWafflePre(canvas, widthEcran, heightEcran) {
    canvas.selectAll(".wafflePre")
        .transition()
        .duration(500)
        .attr("transform", "translate(" + widthEcran*0.3 + "," + -heightEcran*0.45 +")");
    canvas.selectAll(".Button_1")
        .remove();
    canvas.selectAll(".Text1")
        .remove();
}

function removeWaffles(canvas, AllStats, CProvince, heightEcran) {
    AllStats.provinces.forEach(function (d, i) {
        var province = cleanProvince(d);

        if (d.province != CProvince){
            canvas.selectAll(".Button_" + province)
                .remove();
            canvas.selectAll(".valeur_de_" + province)
                .remove();
        }
        else{
            canvas.selectAll(".Button_" + province)
                .transition()
                .duration(500)
                .attr("transform", "translate(0," + (-heightEcran*0.07*(i+1) + 0.1*heightEcran) + ")");
            canvas.selectAll(".valeur_de_" + province)
                .transition()
                .duration(500)
                .attr("transform", "translate(0," + (-heightEcran*0.07*(i+1) + 0.1*heightEcran) + ")");
        }
    });
}

function removeWaffles2(canvas, villes, CVille, heightEcran) {
    villes.forEach(function (d, i) {
        var ville = cleanVille(d);

        if (ville != CVille){
            canvas.selectAll(".Button_" + ville)
                .remove();
            canvas.selectAll(".valeur_de_" + ville)
                .remove();
        }
        else{
            canvas.selectAll(".Button_" + ville)
                .transition()
                .duration(500)
                .attr("transform", "translate(0," + (-heightEcran*0.07*(i+1)) + ")");
            canvas.selectAll(".valeur_de_" + ville)
                .transition()
                .duration(500)
                .attr("transform", "translate(0," + (-heightEcran*0.07*(i+1)) + ")");
        }
    });
}

function removeText2(canvas) {
    canvas.selectAll(".Text2")
        .remove();
}

