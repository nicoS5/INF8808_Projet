"use strict";

function graphLine(canvas, AllStats, widthEcran, heightEcran) {

    var firstStat = 0;
    if (isNaN(AllStats.stats[0][firstStat].valeur)){
        firstStat++;
    }
    var maxValeur = d3.max(AllStats.stats[0], function (d, i) {
        return d.valeur;
    });
    var minValeur = d3.min(AllStats.stats[0], function (d) {
        return d.valeur;
    });
    var maxDate = getDate(AllStats, maxValeur);
    var minDate = getDate(AllStats, minValeur);

    var x = d3.scaleLinear()
        .range([widthEcran*0.1, widthEcran*0.9])
        .domain([AllStats.stats[0][firstStat].annee, 2018]);
    var y = d3.scaleLinear()
        .range([heightEcran*0.6, heightEcran*0.1])
        .domain([0, maxValeur]);
    canvas.append("g")
        .attr("transform", "translate(0," + heightEcran*0.8 + ")")
        .call(d3.axisBottom(x));
    canvas.append("g")
        .attr("transform", "translate(" + widthEcran*0.1 + "," + heightEcran*0.2 + ")")
        .call(d3.axisLeft(y));
    canvas.append("path")
        .datum(AllStats.stats[0])
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("transform", "translate(0," + heightEcran*0.2 + ")")
        .attr("d", d3.line()
            .x(function (d) {
                return x(d.annee);
            })
            .y(function (d) {
                if (isNaN(d.valeur)){
                    return y(0);
                }
                else {
                    return y(d.valeur);
                }
            }))
        .attr("stroke-width", 2);

    appendLines(canvas, widthEcran, heightEcran, x, y, maxValeur, minValeur, maxDate, minDate);
    appendText(canvas, widthEcran, heightEcran, x, y, maxValeur, minValeur);
}

function getDate(AllStats, valeur) {
    var date;
    AllStats.stats[0].forEach(function (d) {
        if (d.valeur == valeur) {
            date = d.annee;
        }
    });
    return date;
}

function appendLines(canvas, widthEcran, heightEcran, x, y, maxValeur, minValeur, maxDate, minDate) {
    canvas.append("line")
        .attr("transform", "translate(0," + heightEcran*0.2 + ")")
        .attr("x1", widthEcran*0.1)
        .attr("y1", y(minValeur))
        .attr("x2", x(2018))
        .attr("y2", y(minValeur))
        .attr("stroke", "blue")
        .attr("stroke-width", 2);
    canvas.append("line")
        .attr("transform", "translate(0," + heightEcran*0.2 + ")")
        .attr("x1", x(minDate))
        .attr("y1", y(0))
        .attr("x2", x(minDate))
        .attr("y2", y(minValeur))
        .attr("stroke", "blue")
        .attr("stroke-width", 2);
    canvas.append("line")
        .attr("transform", "translate(0," + heightEcran*0.2 + ")")
        .attr("x1", widthEcran*0.1)
        .attr("y1", y(maxValeur))
        .attr("x2", x(2018))
        .attr("y2", y(maxValeur))
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    canvas.append("line")
        .attr("transform", "translate(0," + heightEcran*0.2 + ")")
        .attr("x1", x(maxDate))
        .attr("y1", y(0))
        .attr("x2", x(maxDate))
        .attr("y2", y(maxValeur))
        .attr("stroke", "red")
        .attr("stroke-width", 2);
}

function appendText(canvas, widthEcran, heightEcran, x, y, maxValeur, minValeur) {
    canvas.append("text")
        .attr("font-size", "120%")
        .text("Nombre de Fraude")
        .attr("text-anchor", "start")
        .attr("dx", widthEcran*0.05)
        .attr("dy", heightEcran*0.28);
    canvas.append("text")
        .attr("font-size", "120%")
        .text("Annee")
        .attr("text-anchor", "start")
        .attr("dx", widthEcran*0.91)
        .attr("dy", heightEcran*0.78);
    canvas.append("text")
        .attr("font-size", "120%")
        .text(maxValeur + " cas")
        .attr("text-anchor", "end")
        .attr("dx", widthEcran*0.89)
        .attr("y", y(maxValeur) + heightEcran*0.2-10)
        .attr("fill", "red");
    canvas.append("text")
        .attr("font-size", "120%")
        .text(minValeur + " cas")
        .attr("text-anchor", "end")
        .attr("dx", widthEcran*0.89)
        .attr("y", y(minValeur) + heightEcran*0.2+20)
        .attr("fill", "blue");
}
