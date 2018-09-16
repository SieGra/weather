!(function(){

    
    let xhr = new XMLHttpRequest();
    const fetcher = document.getElementById('fetcher');
    const main = document.getElementById('main');
    const canvas = document.getElementById('outputWeather');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;
    let canvasWidth = canvas.width - 30;

    
    xhr.open('POST', '/');
    xhr.send();
    xhr.onloadend = () => {
        let parsed = JSON.parse(xhr.response);
        let percentOfHeight = canvas.width/100;
        let degreeLinesPosY = 10;
        let degreeLineStart = 30;
        let degreeTextStart = 5;
        let degrees = 50;
        
        let timeDotStart = 30;
        let timeDotSpace = canvasWidth/parsed.length;
        let timeDotBaseY = percentOfHeight * 98;
        
        let outputLineX = degreeLineStart;
        let zero = null;
        let five = null;
        
        function returnTimeObject (x){
            let obj = {
             year: parsed[x].time.substr(0, 4),
             month: parsed[x].time.substr(5, 2),
             day: parsed[x].time.substr(8, 2),
             hour: parsed[x].time.substr(11, 2),
             minute: parsed[x].time.substr(14, 2)
            };
            return obj;
        }


        ctx.font = "10px Arial"
        for(let i = 0; i < 100; i++){
            // Makes the temperature-lines in the background
            if(i === Math.round((i/5)) * 5 ){
                if(degrees === 0){
                    zero = degreeLinesPosY;
                } else if ( degrees === 5) {
                    five = degreeLinesPosY;
                }
                let textY = degreeLinesPosY + 2;
                ctx.strokeStyle = "rgba(0,0,0, .3)";
                ctx.beginPath();
                ctx.moveTo(degreeLineStart, degreeLinesPosY);
                ctx.lineTo(degreeLineStart + canvasWidth, degreeLinesPosY)
                ctx.stroke();
                ctx.fillText("" + degrees, degreeTextStart, textY);
                degreeLinesPosY += percentOfHeight * 5;
                degrees -= 5;
            }
        }
        
        let oneDegrees = (zero - five) / 5;
        
        // Makes the timeline-dots on the bottom
        for(let i = 0; i < parsed.length; i++){
            ctx.fillStyle = "rgba(0,0,0, .5)";
            ctx.fillRect(timeDotStart-2.5, timeDotBaseY, 5, 5);
            ctx.strokeStyle = "rgba(255,255,255, .2)"
            ctx.beginPath();
            ctx.moveTo(timeDotStart, timeDotBaseY);
            ctx.lineTo(timeDotStart, 0);
            ctx.stroke();

            let obj = returnTimeObject(i);
            ctx.font = "8px Arial";
            ctx.fillText("D: " + obj.day, timeDotStart, timeDotBaseY+10);
            ctx.fillText("H: " + obj.hour, timeDotStart, timeDotBaseY+20);


            timeDotStart += timeDotSpace;
        }
        
        // Draws the temperature-lines
        ctx.beginPath();
        ctx.moveTo(degreeLineStart, zero);
        ctx.strokeStyle = "red";
        for(let i = 0; i < parsed.length; i++){
            outputLineX += timeDotSpace;
            ctx.lineTo(outputLineX, zero + (-oneDegrees*parsed[i].temp));
            ctx.fillStyle = "red";
            ctx.fillRect(outputLineX, (zero+-1) + (-oneDegrees*parsed[i].temp), 2, 2);
        }
        ctx.stroke();
    };
})();