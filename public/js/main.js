(function () {

    'use strict';

    const address = document.getElementById("address").value;

    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    let interval;

    setInterval(function getDate() {
        fetch(`/api/${address}/unlockDate`)
        .then(response => response.json())
        .then(data => {
            clearInterval(interval);
            if (data.error) {
                document.getElementById("headline").innerText = data.error;
                document.getElementById("countdown").style.display = "none";
                    document.getElementById("content").style.display = "none";
                return;
            }
            const finalDate = new Date(parseInt(data.unlockDate) * 1000);
            document.getElementById("date").innerText = finalDate.toLocaleString();
            interval = setInterval(function () {

                const now = new Date().getTime(),
                    distance = finalDate.getTime() - now;
                
                const days = Math.floor(distance / (day));
                const hours = Math.floor((distance % (day)) / (hour));
                const minutes = Math.floor((distance % (hour)) / (minute));
                const seconds = Math.floor((distance % (minute)) / second);
    
                document.getElementById("days").innerText = days.toString().padStart(2, "0");
                document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
                document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
                document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
    
                //do something later when date is reached
                if (distance < 0) {
                    document.getElementById("headline").innerText = "Locked tokens can be withdrawn by owner";
                    document.getElementById("countdown").style.display = "none";
                    document.getElementById("content").style.display = "block";
                    clearInterval(interval);
                }
                //seconds
            }, 0);
        });
        return getDate;
    }(), 60000);
}());