
/* =========================================================
   ENVELOPE ELEMENTS
========================================================= */

const closeHead = document.getElementById("closeHead");
const openHead = document.getElementById("openHead");
const openEmpty = document.getElementById("openEmpty");
const paper = document.getElementById("paper");
const flowers = document.getElementById("flowers");

/* =========================================================
   ENVELOPE OPENING
========================================================= */

let opened = false;


if (closeHead) {

    closeHead.addEventListener("click", () => {

        /*
           Prevent the envelope from being
           opened multiple times.
        */

        if (opened) return;

        opened = true;


        /* -----------------------------------------
           Hide closed envelope
        ----------------------------------------- */

        closeHead.style.opacity = "0";


        /* -----------------------------------------
           Show opening envelope
        ----------------------------------------- */

        setTimeout(() => {

            if (openHead) {

                openHead.style.opacity = "1";

            }

        }, 400);


        /* -----------------------------------------
           Slide paper out
        ----------------------------------------- */

        setTimeout(() => {

            paper.classList.add("show");
            flowers.classList.add("show");

            if (openHead) {
                openHead.style.opacity = "0";
            }

            if (openEmpty) {
                openEmpty.style.opacity = "1";
            }

        }, 900);

        /* -----------------------------------------
           Enable page scrolling
        ----------------------------------------- */

        setTimeout(() => {

            document.body.style.overflowY = "auto";

        }, 2000);

    });

}
/* =========================================================
   IMAGE FADE-IN ON SCROLL
========================================================= */

const invitationImages =
    document.querySelectorAll(".invitation-image");


const imageObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.25
        }
    );


invitationImages.forEach((image) => {

    imageObserver.observe(image);

});


/* =====================================================
   FRAME 5 - DRESS CODE ANIMATION
===================================================== */

const dresscodeFrame =
    document.getElementById("dresscodeFrame");

if (dresscodeFrame) {

    let dresscodeAnimationPlayed = false;

    function playDresscodeAnimation() {

        // Only play once
        if (dresscodeAnimationPlayed) return;

        dresscodeAnimationPlayed = true;

        // Start the complete animation
        dresscodeFrame.classList.add("animate");

    }

    // Tap anywhere inside Frame 5
    dresscodeFrame.addEventListener(
        "click",
        playDresscodeAnimation
    );

    // Keyboard accessibility
    dresscodeFrame.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();
                playDresscodeAnimation();

            }

        }
    );

}



/* =========================================================
   COUNTDOWN
========================================================= */

/*
   Change this date to your actual wedding date.

   Format:

   YYYY-MM-DDTHH:MM:SS

*/

const eventDate =
    new Date(
        "2027-01-30T00:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        eventDate - now;


    const daysElement =
        document.getElementById("days");


    const hoursElement =
        document.getElementById("hours");


    const minutesElement =
        document.getElementById("minutes");


    const secondsElement =
        document.getElementById("seconds");


    /*
       Make sure the countdown elements
       actually exist before updating them.
    */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    /* -----------------------------------------
       Event has passed
    ----------------------------------------- */

    if (distance <= 0) {

        daysElement.innerText = "00";

        hoursElement.innerText = "00";

        minutesElement.innerText = "00";

        secondsElement.innerText = "00";

        return;

    }


    /* -----------------------------------------
       Calculate remaining time
    ----------------------------------------- */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                distance /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                distance /
                1000
            ) % 60
        );


    /* -----------------------------------------
       Display countdown
    ----------------------------------------- */

    daysElement.innerText =
        String(days).padStart(2, "0");


    hoursElement.innerText =
        String(hours).padStart(2, "0");


    minutesElement.innerText =
        String(minutes).padStart(2, "0");


    secondsElement.innerText =
        String(seconds).padStart(2, "0");

}


/*
   Update immediately.
*/

updateCountdown();


/*
   Update every second.
*/

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   RSVP POPUP
========================================================= */

let rsvpShown = false;


/* =========================================================
   AUTO-SHOW RSVP AT BOTTOM
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.scrollY;


        const windowHeight =
            window.innerHeight;


        const fullHeight =
            document.documentElement
                .scrollHeight;


        /*
           Check whether the user has
           reached the bottom.
        */

        if (
            !rsvpShown &&
            scrollTop + windowHeight >=
            fullHeight - 10
        ) {

            const popup =
                document.getElementById(
                    "rsvpPopup"
                );


            if (popup) {

                popup.classList.add(
                    "active"
                );

                rsvpShown = true;

            }

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   OPEN RSVP POPUP
========================================================= */

function openRsvpPopup() {

    const popup =
        document.getElementById(
            "rsvpPopup"
        );


    if (popup) {

        popup.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CLOSE RSVP POPUP
========================================================= */

function closePopup() {

    const popup =
        document.getElementById(
            "rsvpPopup"
        );


    if (popup) {

        popup.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   SUPABASE CONNECTION
========================================================= */

const SUPABASE_URL = "https://eihygopwcsnlvjabdlmr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_e5YlvIOzfAOuKGMOjtG1ew_AJmCy_4P";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

/* =========================================================
   PUBLIC WISHES
========================================================= */

async function loadPublicWishes() {
    const list = document.getElementById("wishesList");
    if (!list) return;

    const { data, error } = await supabaseClient
        .from("public_wishes")
        .select("display_name, wish, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

    if (error) {
        console.error("Could not load wishes:", error);
        list.textContent = "Wishes will appear here soon. Please check back later.";
        return;
    }

    list.replaceChildren();
    if (!data || data.length === 0) {
        const empty = document.createElement("p");
        empty.className = "wishes-loading";
        empty.textContent = "Be the first to leave a wish for the couple.";
        list.appendChild(empty);
        return;
    }

    data.forEach((item) => {
        const card = document.createElement("article");
        card.className = "wish-card";

        const message = document.createElement("p");
        message.className = "wish-message";
        message.textContent = item.wish;

        const author = document.createElement("p");
        author.className = "wish-author";
        author.textContent = `With love, ${item.display_name}`;

        card.append(message, author);
        list.appendChild(card);
    });
}

loadPublicWishes();


/* =========================================================
   RSVP SUBMIT TO SUPABASE
========================================================= */

const submitBtn = document.querySelector(".submit-btn");

if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
        const nameInput = document.getElementById("nameInput");
        const attendeesInput = document.getElementById("attendeesInput");
        const wishBox = document.getElementById("wishBox");
        const status = document.getElementById("rsvpStatus");

        const name = nameInput.value.trim();
        const attendees = Number.parseInt(attendeesInput.value, 10);
        const wish = wishBox.value.trim();
        const attendance = document.querySelector('input[name="attend"]:checked');

        // Validate name
        if (!name) {
            status.textContent = "Please enter your name.";
            nameInput.focus();
            return;
        }

        // Validate attendance
        if (!attendance) {
            status.textContent = "Please select your attendance.";
            return;
        }

        // Validate number of guests
        if (!Number.isInteger(attendees) || attendees < 1 || attendees > 20) {
            status.textContent = "Please enter between 1 and 20 guests.";
            attendeesInput.focus();
            return;
        }

        // Validate wish
        if (wish.length > 500) {
            status.textContent = "Please keep your wish under 500 characters.";
            wishBox.focus();
            return;
        }

        submitBtn.disabled = true;
        status.textContent = "Sending your RSVP with love...";

        try {
            const { error } = await supabaseClient.rpc(
                "submit_wedding_rsvp",
                {
                    p_name: name,
                    p_attendance: attendance.value,
                    p_attendees: attendees,
                    p_wish: wish
                }
            );

            if (error) {
                throw error;
            }

            // RSVP successfully saved
            status.textContent = "Thank you! Your RSVP has been received. 💕";

            // Clear the form
            nameInput.value = "";
            attendeesInput.value = "1";
            wishBox.value = "";
            wishBox.style.height = "auto";

            document.querySelectorAll('input[name="attend"]').forEach(radio => {
                radio.checked = false;
            });

            // Refresh public wishes
            await loadPublicWishes();

            // CLOSE RSVP POPUP AFTER SUCCESSFUL SUBMISSION
            closePopup();

        } catch (error) {
            console.error("RSVP submission failed:", error);
            status.textContent = "Sorry, we couldn't save your RSVP. Please try again.";
        } finally {
            submitBtn.disabled = false;
        }
    });
}


/* =========================================================
   AUTO-EXPAND TEXTAREA
========================================================= */

const textarea =
    document.getElementById(
        "wishBox"
    );


if (textarea) {

    textarea.addEventListener(
        "input",
        () => {


            /*
               Reset height first so
               it can shrink when text
               is deleted.
            */

            textarea.style.height =
                "auto";


            /*
               Expand to fit content.
            */

            textarea.style.height =
                textarea.scrollHeight +
                "px";

        }
    );

}


/* Show navigation buttons only at page bottom */

function checkPageBottom() {
    const scrollPosition =
        window.scrollY + window.innerHeight;

    const pageHeight =
        document.documentElement.scrollHeight;

    const isAtBottom =
        scrollPosition >= pageHeight - 10;

    document.body.classList.toggle(
        "at-page-bottom",
        isAtBottom
    );
}

window.addEventListener("scroll", checkPageBottom, {
    passive: true
});

window.addEventListener("resize", checkPageBottom);

window.addEventListener("load", checkPageBottom);

checkPageBottom();


/* ================= INFO POPUP FUNCTIONS ================= */

function openInfoPopup(popupId) {
    const popup = document.getElementById(popupId);

    if (popup) {
        popup.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeInfoPopup(popupId) {
    const popup = document.getElementById(popupId);

    if (popup) {
        popup.classList.remove("active");
    }

    // Keep scrolling locked if another info popup is still open.
    const anotherPopupOpen = document.querySelector(".info-popup.active");

    if (!anotherPopupOpen) {
        document.body.style.overflow = "";
    }
}

function closeInfoPopupOutside(event, popupId) {
    if (event.target.id === popupId) {
        closeInfoPopup(popupId);
    }
}

// Close an info popup with the Escape key.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".info-popup.active").forEach(function (popup) {
            closeInfoPopup(popup.id);
        });
    }
});

// =====================================
// BACKGROUND WEDDING MUSIC
// =====================================

(() => {
    const music = document.getElementById("backgroundMusic");
    const toggle = document.getElementById("musicToggle");
    const icon = document.getElementById("musicIcon");

    if (!music || !toggle || !icon) return;

    let musicEnabled = true;

    function updateMusicButton() {
        if (music.paused) {
            icon.textContent = "🔇";
            toggle.setAttribute("aria-label", "Play background music");
            toggle.setAttribute("aria-pressed", "false");
        } else {
            icon.textContent = "🔊";
            toggle.setAttribute("aria-label", "Pause background music");
            toggle.setAttribute("aria-pressed", "true");
        }
    }

  async function playMusic() {
    if (!musicEnabled) return;

    try {
        await music.play();
        updateMusicButton();
    } catch (error) {
        updateMusicButton();
    }
}

    // Attempt autoplay when the invitation opens
    playMusic();

    // Start music after the visitor's first interaction if autoplay is blocked
    function startAfterInteraction() {
        if (musicEnabled && music.paused) {
            playMusic();
        }

        if (!music.paused) {
            document.removeEventListener("pointerdown", startAfterInteraction);
            document.removeEventListener("click", startAfterInteraction);
        }
    }

    document.addEventListener("pointerdown", startAfterInteraction);
    document.addEventListener("click", startAfterInteraction);

    // Speaker button toggles music
    toggle.addEventListener("click", async (event) => {
        event.stopPropagation();

        if (music.paused) {
            musicEnabled = true;
            await playMusic();
        } else {
            musicEnabled = false;
            music.pause();
            updateMusicButton();
        }
    });

    music.addEventListener("play", updateMusicButton);
    music.addEventListener("pause", updateMusicButton);

    updateMusicButton();
})();


