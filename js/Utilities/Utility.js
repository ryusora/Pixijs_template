export class Utility
{
    static GetStringFromNumber(numbers)
    {
        var heSo = 10
        var result = ""
        var number = numbers
        var count = 4
        if(heSo > number) return number + ""

        while(number > 0)
        {
            var soDu = number % heSo
            result = soDu + ((--count == 0)?".":"") + result
            number = Math.floor(number/ heSo)
            if(count == 0) count = 3
        }

        return result
    }
    static ReadFile(filePath){
        return new Promise((resolve, reject)=>{
            var xmlhttp;
        
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();               
            }           
            else {               
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");               
            }
        
            xmlhttp.onreadystatechange = function () {               
                if (xmlhttp.readyState == 4) {                   
                    var lines = xmlhttp.responseText;
                    resolve(lines);
                }
            }
            
            xmlhttp.onerror = reject;

            xmlhttp.open("GET", filePath, true);
            xmlhttp.send();
        });
    }
}