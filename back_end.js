// Faz o background se mecher
let windowWidth = $(window).width();

$('.page-container').mousemove(function (e) {
    let moveX = (($(window).width() / 2) - e.pageX) * 0.1;
    let moveY = (($(window).height() / 2) - e.pageY) * 0.1;
    $('.page-back').css('margin-left', moveX + 'px');
    $('.page-back').css('margin-top', moveY + 'px');
});

// Alterna o que está vísivel na página
$('#bpmbutton').click(function() {
    $('#bpminput').toggleClass("hidden");
})

$('#dragon').click(async () => {
    await Tone.start()
    console.log('audio is ready')
});


// Music Maker
function sequencer(){
    // Drums
    const kick = new Tone.Player('sounds/drums/kick.wav').toDestination();
    const snap = new Tone.Player('sounds/drums/clap.wav').toDestination();
    const hat = new Tone.Player('sounds/drums/hat.wav').toDestination();
    const crash = new Tone.Player('sounds/drums/crash.wav').toDestination();

    // Loops
    const arp = new Tone.Player('sounds/loops/arp.wav').toDestination();
    const melody = new Tone.Player('sounds/loops/melody.wav').toDestination();
    const lead = new Tone.Player('sounds/loops/lead.wav').toDestination();
    const guitar = new Tone.Player('sounds/loops/guitar.wav').toDestination();
    const fingering = new Tone.Player('sounds/loops/fingering.wav').toDestination();
    const cinematic = new Tone.Player('sounds/loops/cinematicloop.wav').toDestination();
    const drum = new Tone.Player('sounds/loops/drumloop.wav').toDestination();

    // Samples
    const growl = new Tone.Player('sounds/samples/growl.wav').toDestination();
    const bass = new Tone.Player('sounds/samples/bass.wav').toDestination();
    const game = new Tone.Player('sounds/samples/game.wav').toDestination();
    const whomp = new Tone.Player('sounds/samples/whomp.wav').toDestination();
    const pluck = new Tone.Player('sounds/samples/pluck.wav').toDestination();

    // Effects
    const sweep = new Tone.Player('sounds/effects/sweep.wav').toDestination();
    const exhaust = new Tone.Player('sounds/effects/exhaust.wav').toDestination();
    const fill = new Tone.Player('sounds/effects/fill.wav').toDestination();
    
    let index = 0;

    Tone.Transport.scheduleRepeat(repeat, "4n");
    Tone.Transport.start();
    Tone.Transport.bpm.value = 128;

    $('#growlbutton').click(function () {
        growl.start();
    })
    $('#bassbutton').click(function () {
        bass.start();
    })
    $('#gamebutton').click(function () {
        game.start();
    })
    $('#whompbutton').click(function () {
        whomp.start();
    })
    $('#pluckbutton').click(function () {
        pluck.start();
    })
    
    function repeat() {
        let step = index % 16;
        let kickInputs = document.querySelector(`.kick input:nth-child(${step + 1})`);
        let snapInputs = document.querySelector(`.snap input:nth-child(${step + 1})`);
        let hatInputs = document.querySelector(`.hat input:nth-child(${step + 1})`);
        let crashInputs = document.querySelector(`.crash input:nth-child(${step + 1})`);

        if (kickInputs.checked) {
            kick.start();
        }
        if (snapInputs.checked) {
            snap.start();
        }
        if (hatInputs.checked) {
            hat.start();
        }
        if (crashInputs.checked) {
            crash.start();
        }

        if ($('#arploop').hasClass("playing") && (step === 0 || step === 8)) {
            $('#arpbutton').removeClass("btn-warning");
            $('#arpbutton').addClass("btn-info");
            arp.start();
        }
        if ($('#melodyloop').hasClass("playing") && step === 0) {
            $('#melodybutton').removeClass("btn-warning");
            $('#melodybutton').addClass("btn-info");
            melody.start();
        }
        if ($('#leadloop').hasClass("playing") && step === 0) {
            $('#leadbutton').removeClass("btn-warning");
            $('#leadbutton').addClass("btn-info");
            lead.start();
        }
        if ($('#guitarloop').hasClass("playing") && step === 0) {
            $('#guitarbutton').removeClass("btn-warning");
            $('#guitarbutton').addClass("btn-info");
            guitar.start();
        }
        if ($('#fingeringloop').hasClass("playing") && step === 0) {
            $('#fingeringbutton').removeClass("btn-warning");
            $('#fingeringbutton').addClass("btn-info");
            fingering.start();
        }
        if ($('#cinematicloop').hasClass("playing") && (step === 0 || step === 8)) {
            $('#cinematicbutton').removeClass("btn-warning");
            $('#cinematicbutton').addClass("btn-info");
            cinematic.start();
        }
        if ($('#drumloop').hasClass("playing") && (step === 0 || step === 8)) {
            $('#drumbutton').removeClass("btn-warning");
            $('#drumbutton').addClass("btn-info");
            drum.start();
        }
        if ($('#sweep').hasClass("playing") && step === 0) {
            $('#sweep').removeClass("playing");
            sweep.start();
        }
        if ($('#exhaust').hasClass("playing") && step === 0) {
            $('#exhaust').removeClass("playing");
            exhaust.start();
        }
        if ($('#fill').hasClass("playing") && step === 0) {
            $('#fill').removeClass("playing");
            fill.start();
        }
        index++;
    }
}
sequencer();

// Definir BPM
$('#bpminput').change(function() {
    Tone.Transport.bpm.value = $('#bpminput').val();
    if ($('#playerstate').hasClass("fa fa-play")) {
    $('#playerbutton').toggleClass("btn-outline-danger");
    $('#playerbutton').toggleClass("btn-outline-success");
    $('#playerstate').toggleClass("fa fa-stop");
    $('#playerstate').toggleClass("fa fa-play");
    }
})

// Player
$('#playerbutton').click(function(e) {
    $('#playerbutton').toggleClass("btn-outline-danger");
    $('#playerbutton').toggleClass("btn-outline-success");
    $('#playerstate').toggleClass("fa fa-stop");
    $('#playerstate').toggleClass("fa fa-play");
    if($('#playerstate').hasClass("fa fa-play")) {
        Tone.Transport.bpm.value = 0;
        Tone.Master.mute = true;
    }else{
        Tone.Transport.bpm.value = $('#bpminput').val();
        Tone.Master.mute = false;
    }
})

// Loops
$('#arpbutton').click(function() {
    if ($('#arploop').hasClass("playing")) {
        $('#arploop').toggleClass("playing");
        $('#arpbutton').removeClass("btn-info");
        $('#arpbutton').addClass("btn-light");
    }else{
        $('#arploop').toggleClass("playing");
        $('#arpbutton').removeClass("btn-light");
        $('#arpbutton').addClass("btn-warning");
    } 
})
$('#melodybutton').click(function () {
    if ($('#melodyloop').hasClass("playing")) {
        $('#melodyloop').toggleClass("playing");
        $('#melodybutton').removeClass("btn-info");
        $('#melodybutton').addClass("btn-light");
    } else {
        $('#melodyloop').toggleClass("playing");
        $('#melodybutton').removeClass("btn-light");
        $('#melodybutton').addClass("btn-warning");
    }
})
$('#leadbutton').click(function () {
    if ($('#leadloop').hasClass("playing")) {
        $('#leadloop').toggleClass("playing");
        $('#leadbutton').removeClass("btn-info");
        $('#leadbutton').addClass("btn-light");
    } else {
        $('#leadloop').toggleClass("playing");
        $('#leadbutton').removeClass("btn-light");
        $('#leadbutton').addClass("btn-warning");
    }
})
$('#guitarbutton').click(function () {
    if ($('#guitarloop').hasClass("playing")) {
        $('#guitarloop').toggleClass("playing");
        $('#guitarbutton').removeClass("btn-info");
        $('#guitarbutton').addClass("btn-light");
    } else {
        $('#guitarloop').toggleClass("playing");
        $('#guitarbutton').removeClass("btn-light");
        $('#guitarbutton').addClass("btn-warning");
    }
})
$('#fingeringbutton').click(function () {
    if ($('#fingeringloop').hasClass("playing")) {
        $('#fingeringloop').toggleClass("playing");
        $('#fingeringbutton').removeClass("btn-info");
        $('#fingeringbutton').addClass("btn-light");
    } else {
        $('#fingeringloop').toggleClass("playing");
        $('#fingeringbutton').removeClass("btn-light");
        $('#fingeringbutton').addClass("btn-warning");
    }
})
$('#cinematicbutton').click(function () {
    if ($('#cinematicloop').hasClass("playing")) {
        $('#cinematicloop').toggleClass("playing");
        $('#cinematicbutton').removeClass("btn-info");
        $('#cinematicbutton').addClass("btn-light");
    } else {
        $('#cinematicloop').toggleClass("playing");
        $('#cinematicbutton').removeClass("btn-light");
        $('#cinematicbutton').addClass("btn-warning");
    }
})
$('#drumbutton').click(function () {
    if ($('#drumloop').hasClass("playing")) {
        $('#drumloop').toggleClass("playing");
        $('#drumbutton').removeClass("btn-info");
        $('#drumbutton').addClass("btn-light");
    } else {
        $('#drumloop').toggleClass("playing");
        $('#drumbutton').removeClass("btn-light");
        $('#drumbutton').addClass("btn-warning");
    }
})

// Effects
$('#sweepbutton').click(function () {
    $('#sweep').toggleClass("playing");
})
$('#exhaustbutton').click(function () {
    $('#exhaust').toggleClass("playing");
})
$('#fillbutton').click(function () {
    $('#fill').toggleClass("playing");
})




