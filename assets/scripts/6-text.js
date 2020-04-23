"use strict";

function Text1(canvas, widthEcran, heightEcran) {
    canvas.append("text")
        .attr("class", "Text1")
        .attr("font-size", "140%")
        .text("Au cour des huit derniere annee, le nombre de fraude au Canada n'a cesse d'augmenter.")
        .attr("text-anchor", "middle")
        .attr("dx", widthEcran*0.5)
        .attr("dy", heightEcran*0.3);

    canvas.append("text")
        .attr("class", "Text1")
        .attr("font-size", "140%")
        .text("Entre 2011 et 2018, on peut constater une augmentation d'environs 66%.")
        .attr("text-anchor", "middle")
        .attr("dx", widthEcran*0.5)
        .attr("dy", heightEcran*0.3 + 30);

    canvas.append("text")
        .attr("class", "Text1")
        .attr("font-size", "140%")
        .text("A votre avis, de quelle region provient cette augmentation ?")
        .attr("text-anchor", "middle")
        .attr("dx", widthEcran*0.5)
        .attr("dy", heightEcran*0.3 + 60);
}