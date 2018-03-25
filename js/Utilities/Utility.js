var Utility = function()
{
    this.GetStringFromNumber = function(numbers)
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
}

module.exports = new Utility()