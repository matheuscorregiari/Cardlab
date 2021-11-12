

const FORM = {
    post: document.getElementById('posto'),
    vaccine: document.getElementById('vacina'),
    date: document.getElementById('date'),

    getValues() {

        return {
            post: this.post.value,
            vaccine: this.vaccine.value,
            date: this.date.value
        }
    },

    sendingForm(e){
        e.preventDefault();

        try {
            const userId = sessionStorage.getItem('id');
            
            const { date, post, vaccine} = this.getValues();

            /*let [year, month, day ] = date.split('-');
            month = Number(month)+2;

            const dateNextDose = new Date(Number(year), month, Number(day));
            console.log(dateNextDose);*/
            var time = new Date(date);
            var outraData = new Date();
            outraData.setDate(time.getDate() + 90);
            console.log(outraData)

/*
            $.ajax({
                url: '../../service/agendarService.php',
                data: { date, post, vaccine, userId, dateNextDose: dateNextDose.toDateString() },
                type: 'POST',
                success: function(response) {
                    console.log(response);
                }
            })*/
        } catch (error) {
            alert(error.message);
        }
    }


}