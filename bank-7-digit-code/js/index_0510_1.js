
$(function () {
    var bankJson = JSON.parse(bank)
    $("#btnChange").click(function () {
        let output = ''
        let source = $('#inputText').val()
            .replace(/臺/g, '台')
            .replace(/簡易型/g, "")
            .replace(/台銀/g, "台灣銀行")
            .replace(/郵局/g, "中華郵政")
            .replace(/中信/g, "中國信託商業銀行")
            .replace(/合庫/g, "合作金庫")
            .replace(/凱基銀行/g,"凱基商業銀行")
            .replace(/匯豐銀行/g,"滙豐(台灣)商業銀行")
            .replace(/台北富邦銀行/g, "台北富邦商業銀行")
            .replace(/台灣企銀/g, "台灣中小企業銀行")
            .replace(/台灣中小企銀/g, "台灣中小企業銀行")
            .replace(/土地銀行/g, "台灣土地銀行")
            .replace(/富邦銀行/g, "台北富邦商業銀行")
            .replace(/新光銀行/g, "台灣新光商業銀行")
            .replace(/台灣台灣/g, "台灣")
            .replace(/台北台北/g, "台北")
            .replace(/將來銀行/g, "將來商業銀行")
            .replace(/連線銀行/g, "連線商業銀行")
            .replace(/LineBank/g, "連線商業銀行")
            .replace(/二信/g,"第二信")
            .replace(/三信/g,"第三信")
            .replace(/四信/g,"第四信")
            .replace(/五信/g,"第五信")
            .replace(/六信/g,"第六信")
            .replace(/十信/g,"第十信")
            .replace(/\(/g, "").replace(/\)/g, "")
            .replace(/ /g, "")
            .replace(/	/g,"")
            .split('\n');
        source.forEach(element => {
            element = element.trim()
            console.log(element)

            if (element.indexOf("中國信託") >= 0 && element.indexOf('銀行') < 0) {
                element = element.replace(/中國信託/g, "中國信託商業銀行")
            }

            if (element.indexOf('合作社') >=0 && element.indexOf("有限責任") == 0){
                element = element.replace(/有限責任/g, "")
            }

            console.log(element.substr(0, 2))
            console.log(element.substr(-4))
            if (element.indexOf('中華郵政') >= 0) {
                output = output + '7000021' + '\n'
            } else {
                let leftForEach = false

                bankJson.forEach(element2 => {
                    if (!leftForEach) {
                        if (element == element2.Key) {
                            console.log(element2.Key)
                            output = output + element2.Value + '\n'
                            leftForEach = true
                        }
                    }
                })

                if (!leftForEach) {
                    if(element.indexOf("二信")>=0||element.indexOf("三信")>=0||element.indexOf("四信")>=0||element.indexOf("五信")>=0||element.indexOf("六信")>=0||element.indexOf("十信")>=0){
                        bankJson.forEach(element2 => {
                            if (!leftForEach) {
                                if (element.substr(0, 4) == element2.Key.substr(0, 4) && element.substr(-4) == element2.Key.substr(-4)) {
                                    output = output + element2.Value + '\n'
                                    leftForEach = true
                                }
                            }
                        })
                    }else{
                        bankJson.forEach(element2 => {
                            if (!leftForEach) {
                                if (element.substr(0, 2) == element2.Key.substr(0, 2) && element.substr(-4) == element2.Key.substr(-4)) {
                                    output = output + element2.Value + '\n'
                                    leftForEach = true
                                }
                            }
                        })
                    }
                    
                }

                if (!leftForEach) {
                    output = output + '\n'
                }
            }

        });
        $('#outputText').val(output)
        console.log(output.length)
    })

    $("#btnSearch").click(function(){
        let output = ''
        let keyword = $('#search').val()
        bankJson.forEach(element => {
            if(element.Key.indexOf(keyword)>=0){
                output = output + element.Key + " : " + element.Value+ '\n'
            }
        })
        $('#searchResultText').val(output)
    })
});