window['addAds'] = function(){
    const cardList = document.getElementsByClassName('gads');
    for(let i=0 ; i<cardList.length ; i++){
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
    
}