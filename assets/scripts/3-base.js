"use strict";

function baseCanvas(widthEcran, heightEcran) {
    var canvas = d3.select("body")
        .append("svg")
        .attr("id", "FirstCanvas")
        .attr("width", widthEcran)
        .attr("height", heightEcran);
    return (canvas);
}

function baseText(canvas, widthEcran, heightEcran) {
    canvas.append("text")
        .attr("font-size", "225%")
        .text("La securite des transactions bancaires au Canada")
        .attr("text-anchor", "middle")
        .attr("dx", widthEcran*0.5)
        .attr("dy", heightEcran*0.1);
    canvas.append("text")
        .attr("font-size", "200%")
        .text("Nombre de fraude par an au Canada de 1998 a 2018")
        .attr("text-anchor", "middle")
        .attr("dx", widthEcran*0.5)
        .attr("dy", heightEcran*0.2);
}

function baseBouton(canvas, widthEcran, heightEcran, nbClick) {
    canvas.append("rect")
        .attr("class", "Button_" + nbClick)
        .attr("id", "rect_" + nbClick)
        .attr("x", widthEcran*0.8)
        .attr("y", heightEcran*0.9)
        .attr("width", 150)
        .attr("height", 50)
        .attr("stroke", "black")
        .attr("fill", "white");
    canvas.append("text")
        .attr("class", "Button_" + nbClick)
        .attr("font-size", "120%")
        .text("SUITE !")
        .attr("text-anchor", "middle")
        .attr("dx", widthEcran*0.8 + 75)
        .attr("dy", heightEcran*0.9 + 30);
}

function cleanProvince(d) {
    var province = d.province.slice(0,-5);
    while (province.indexOf(" ") >= 0){
        province = province.replace(" ", "_");
    }
    return province;
}

function  cleanVille(d) {
    var ville = d.ville;
    var Icrochet = ville.indexOf("[");
    ville = ville.slice(0, - ville.length + Icrochet -1);
    while (ville.indexOf(" ") >= 0){
        ville = ville.replace(" ", "_");
    }
    while (ville.indexOf("/") >= 0){
        ville = ville.replace("/", "_");
    }
    while (ville.indexOf(",") >= 0){
        ville = ville.replace(",", "");
    }
    while (ville.indexOf(".") >= 0){
        ville = ville.replace(".", "_");
    }
    while (ville.indexOf("'") >= 0) {
        ville = ville.replace("'", "_");
    }
    return ville;
}

function baseReload(canvas, widthEcran, heightEcran) {
    canvas.append("rect")
        .attr("class", "Reload")
        .attr("id", "rect_R")
        .attr("x", widthEcran*0.8)
        .attr("y", heightEcran*0.9)
        .attr("width", 150)
        .attr("height", 50)
        .attr("stroke", "black")
        .attr("fill", "white");
    canvas.append("text")
        .attr("class", "Reload")
        .attr("font-size", "120%")
        .text("Recommencer")
        .attr("text-anchor", "middle")
        .attr("dx", widthEcran*0.8 + 75)
        .attr("dy", heightEcran*0.9 + 30);
}

function baseHover(canvas, nbClicks) {
    canvas.selectAll("#rect_" + nbClicks)
        .attr("fill", "grey");
}

function baseHoverOut(canvas, nbClicks) {
    canvas.selectAll("#rect_" + nbClicks)
        .attr("fill", "white");
}