// Select the node that will be observed for mutations
const targetNode = document.getElementById("root");

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

const mainLogFunction = console.log;

// Override console.log to use the mainLogFunction
console.log = (...args) => {
  // add color and prefix and time
  const time = new Date().toLocaleTimeString();
  const prefix = "[Content Script]";
  const coloredArgs = args.map((arg) => {
    if (typeof arg === "string") {
      return `%c${arg}`;
    }
    return arg;
  });

  mainLogFunction(
    ...coloredArgs,
    `color: green; font-weight: bold;`,
    `${prefix} ${time}`
  );
};

const contactInfomations = {
  email: "fahimource@gmail.com",
  phone: "1234567890",
};

const travelers = [
  {
    gender: "male",
    firstName: "Traveler",
    lastName: "One",
    dateOfBirth: "1990-01-01",
  },
  {
    gender: "female",
    firstName: "Traveler",
    lastName: "Two",
    dateOfBirth: "1992-02-02",
  },
  {
    gender: "male",
    firstName: "Traveler",
    lastName: "Three",
    dateOfBirth: "2020-03-03",
  },
  {
    gender: "female",
    firstName: "Traveler",
    lastName: "Four",
    dateOfBirth: "2021-04-04",
  },
];

let stepCount = 0;
// Create an observer instance linked to the callback function
const observer = new MutationObserver(() => {
  // Step 0: Add event listener to the "View trip" button
  {
    // check [data-testid="view-trip-button"] buttons are exist then add event listeners
    const buttons = document.querySelectorAll(
      '[data-testid="view-trip-button"]'
    );
    buttons.forEach((button) => {
      if (!button.hasAttribute("data-listener-added")) {
        button.addEventListener("click", () => {
          console.log(`View trip button clicked step:${stepCount}`);
          stepCount = 1;
        });
        button.setAttribute("data-listener-added", "true");
      }
    });
  }

  // Step 1: Check for trip details overlay and click ticket and continue button
  {
    if (stepCount == 1) {
      // check [data-testid="trip-details-overlay-content"] elements are exist then click ticket and continue button
      const tripDetailsElements = document.querySelector(
        '[data-testid="trip-details-overlay-content"]'
      );

      if (tripDetailsElements) {
        console.log(`Trip details overlay content found. Step: ${stepCount}`);

        // check [data-testid="ticket-STANDARD_TICKET"] elements are exist then click it
        const ticketElements = document.querySelector(
          '[data-testid="ticket-STANDARD_TICKET"]'
        );

        if (ticketElements && !ticketElements.hasAttribute("data-clicked")) {
          ticketElements.click();
          ticketElements.setAttribute("data-clicked", "true");
          console.log(`Ticket clicked. Step: ${stepCount}`);
        }

        // click the "Continue" button
        const continueButton = document.querySelector(
          `[data-testid="resultPage-continue-book-button"]`
        );

        if (continueButton && !continueButton.hasAttribute("data-clicked")) {
          continueButton.click();
          continueButton.setAttribute("data-clicked", "true");
          console.log(`Continue button clicked. Step: ${stepCount}`);
        }

        stepCount = 2;
      }

      // check [data-testid="yourSelectedTrip-proceedButton"] is exist then click it
      const proceedButton = document.querySelector(
        `[data-testid="yourSelectedTrip-proceedButton"]`
      );

      if (proceedButton && !proceedButton.hasAttribute("data-clicked")) {
        proceedButton.click();
        proceedButton.setAttribute("data-clicked", "true");
        console.log(`Proceed button clicked. Step: ${stepCount}`);
      }
    }
  }

  // Step 2: Fill in contact information
  {
    if (stepCount === 2) {
      console.log(`Filling contact information. Step: ${stepCount}`);

      // check [data-testid="travelerDetails-contactForm"] is exist then fill in contact information
      const contactForm = document.querySelector(
        '[data-testid="travelerDetails-contactForm"]'
      );

      if (contactForm) {
        // check [data-testid="traveler-email-input"] is exist then fill in email
        const emailInput = document.querySelector(
          '[data-testid="traveler-email-input"]'
        );

        if (emailInput && !emailInput.hasAttribute("data-filled")) {
          emailInput.value = contactInfomations.email;
          emailInput.dispatchEvent(new Event("input", { bubbles: true }));
          emailInput.setAttribute("data-filled", "true");
          console.log(`Email filled: ${contactInfomations.email}`);
        }

        // check [data-testid="traveler-email-confirm-input"] is exist then fill in email confirm
        const emailConfirmInput = document.querySelector(
          '[data-testid="traveler-email-confirm-input"]'
        );

        if (
          emailConfirmInput &&
          !emailConfirmInput.hasAttribute("data-filled")
        ) {
          emailConfirmInput.value = contactInfomations.email;
          emailConfirmInput.dispatchEvent(
            new Event("input", { bubbles: true })
          );
          emailConfirmInput.setAttribute("data-filled", "true");
          console.log(`Email confirm filled: ${contactInfomations.email}`);
        }

        // check [data-testid="traveler-phone-input"] is exist then fill in phone
        const phoneInput = document.querySelector(
          '[data-testid="traveler-phone-input"]'
        );

        if (phoneInput && !phoneInput.hasAttribute("data-filled")) {
          phoneInput.value = contactInfomations.phone;
          phoneInput.dispatchEvent(new Event("input", { bubbles: true }));
          phoneInput.setAttribute("data-filled", "true");
          console.log(`Phone filled: ${contactInfomations.phone}`);
        }

        stepCount = 3;
      } else {
        console.log(
          `Contact form not found. Waiting for it to appear. Step: ${stepCount}`
        );
      }
    }
  }

  // Step 3: Fill in traveler information
  {
    if (stepCount === 3) {
      console.log(`Filling traveler information. Step: ${stepCount}`);

      // check [data-testid="travelerDetails-traveler-\d-section"] how many sections are exist then fill in traveler information

      const travelerSections = document.querySelectorAll(
        '[data-testid^="travelerDetails-traveler-"][data-testid$="-section"]'
      );

      if (travelerSections.length > 0) {
        // Loop through each traveler section and fill in the information
        travelerSections.forEach((section, index) => {
          const traveler = travelers[index];
          if (!traveler) {
            console.warn(`No traveler data for index ${index}`);
            return;
          }
          // check [data-testid="travelerDetails-female-0-label"] or [data-testid="travelerDetails-male-0-label"] is exist then fill in
          const genderLabel = section.querySelector(
            `[data-testid="travelerDetails-${traveler.gender.toLowerCase()}-${index}-label"]`
          );

          if (genderLabel && !genderLabel.hasAttribute("data-filled")) {
            genderLabel.click();
            genderLabel.setAttribute("data-filled", "true");
            console.log(`Gender filled: ${traveler[index]}`);
          }

          // check [data-testid="traveler-firstName-0-input"] is exist then fill in first name
          const firstNameInput = section.querySelector(
            `[data-testid="traveler-firstName-${index}-input"]`
          );

          if (firstNameInput && !firstNameInput.hasAttribute("data-filled")) {
            firstNameInput.value = traveler.firstName;
            firstNameInput.dispatchEvent(new Event("input", { bubbles: true }));
            firstNameInput.setAttribute("data-filled", "true");
            console.log(`First name filled: ${traveler.firstName}`);
          }

          // check [data-testid="traveler-lastName-0-input"] is exist then fill in last name
          const lastNameInput = section.querySelector(
            `[data-testid="traveler-lastName-${index}-input"]`
          );

          if (lastNameInput && !lastNameInput.hasAttribute("data-filled")) {
            lastNameInput.value = traveler.lastName;
            lastNameInput.dispatchEvent(new Event("input", { bubbles: true }));
            lastNameInput.setAttribute("data-filled", "true");
            console.log(`Last name filled: ${traveler.lastName}`);
          }

          // check [data-testid="traveler-date-of-birth-form-0-input"] is exist then fill in date of birth
          const dobInput = section.querySelector(
            `[data-testid="traveler-date-of-birth-form-${index}-input"]`
          );

          if (dobInput && !dobInput.hasAttribute("data-filled")) {
            dobInput.value = traveler.dateOfBirth;
            dobInput.dispatchEvent(new Event("input", { bubbles: true }));
            dobInput.setAttribute("data-filled", "true");
            console.log(`Date of birth filled: ${traveler.dateOfBirth}`);
          }
        });

        console.log(`Traveler information filled. Step: ${stepCount}`);
        stepCount = 4;
      }
    }
  }

  // Step 4: configure extra addons for the trip
  {
    if (stepCount === 4) {
      console.log(`Configuring your trip. Step: ${stepCount}`);

      // check [data-testid="productBundleItem-257"] is exist then click it
      const configureTripButton = document.querySelector(
        '[data-testid="productBundleItem-257"]'
      );

      if (
        configureTripButton &&
        !configureTripButton.hasAttribute("data-clicked")
      ) {
        configureTripButton.click();
        configureTripButton.setAttribute("data-clicked", "true");
        console.log(`Configure your trip button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="flexibleTicket-select-box"] is exist then click it
      const flexibleTicketButton = document.querySelector(
        '[data-testid="flexibleTicket-select-box"]'
      );

      if (
        flexibleTicketButton &&
        !flexibleTicketButton.hasAttribute("data-clicked")
      ) {
        flexibleTicketButton.click();
        flexibleTicketButton.setAttribute("data-clicked", "true");
        console.log(`Flexible ticket button clicked. Step: ${stepCount}`);

        const listsContainer = document.querySelector(
          `[data-testid="flexibleTicket-product-selection"]`
        );

        if (listsContainer) {
          const listItems = listsContainer.querySelectorAll("ul li");
          if (listItems.length > 0) {
            // Click the first item in the list
            listItems[listItems.length - 1].click();
            console.log(
              `First item in flexible ticket list clicked. Step: ${stepCount}`
            );
          } else {
            console.warn(`No items found in flexible ticket list.`);
          }
        }

        flexibleTicketButton.click();
      }

      // check [data-testid="flexibleTicketModal-decline-button"] is exist then click it
      const flexibleTicketModalButton = document.querySelector(
        '[data-testid="flexibleTicketModal-decline-button"]'
      );

      if (
        flexibleTicketModalButton &&
        !flexibleTicketModalButton.hasAttribute("data-clicked")
      ) {
        flexibleTicketModalButton.click();
        flexibleTicketModalButton.setAttribute("data-clicked", "true");
        console.log(`Flexible ticket modal button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="cancellationGuarantee--false"] is exist then click it
      const cancellationGuaranteeButton = document.querySelector(
        '[data-testid="cancellationGuarantee--false"]'
      );

      if (
        cancellationGuaranteeButton &&
        !cancellationGuaranteeButton.hasAttribute("data-clicked")
      ) {
        cancellationGuaranteeButton.click();
        cancellationGuaranteeButton.setAttribute("data-clicked", "true");
        console.log(
          `Cancellation guarantee button clicked. Step: ${stepCount}`
        );
      }

      // check [data-testid="cancellationInsuranceCoverGenius--false"] is exist then click it

      const cancellationInsuranceButton = document.querySelector(
        '[data-testid="cancellationInsuranceCoverGenius--false"]'
      );

      if (
        cancellationInsuranceButton &&
        !cancellationInsuranceButton.hasAttribute("data-clicked")
      ) {
        cancellationInsuranceButton.click();
        cancellationInsuranceButton.setAttribute("data-clicked", "true");
        console.log(
          `Cancellation insurance button clicked. Step: ${stepCount}`
        );
      }

      stepCount = 5;
    }
  }

  // Step 5: Click the "Continue" button to proceed to book now
  {
    if (stepCount === 5) {
      console.log(`Clicking continue button to book now. Step: ${stepCount}`);

      // check [data-testid="bookNow-button"] is exist then click it
      const continueButton = document.querySelector(
        `[data-testid="bookNow-button"]`
      );

      if (continueButton && !continueButton.hasAttribute("data-clicked")) {
        continueButton.click();
        continueButton.setAttribute("data-clicked", "true");
        console.log(`Continue button clicked. Step: ${stepCount}`);
      }

      stepCount = 6;
    }
  }

  // Step 6: Extra addons for the trip
  {
    if (stepCount == 6) {
      // check [data-testid="travelInsuranceCoverGenius--false"] is exist then click it

      const travelInsuranceButton = document.querySelector(
        '[data-testid="travelInsuranceCoverGenius--false"]'
      );

      if (
        travelInsuranceButton &&
        !travelInsuranceButton.hasAttribute("data-clicked")
      ) {
        travelInsuranceButton.click();
        travelInsuranceButton.setAttribute("data-clicked", "true");
        console.log(`Travel insurance button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="bankruptcyInsuranceCoverGenius--false"] is exist then click it

      const bankruptcyInsuranceButton = document.querySelector(
        '[data-testid="bankruptcyInsuranceCoverGenius--false"]'
      );

      if (
        bankruptcyInsuranceButton &&
        !bankruptcyInsuranceButton.hasAttribute("data-clicked")
      ) {
        bankruptcyInsuranceButton.click();
        bankruptcyInsuranceButton.setAttribute("data-clicked", "true");
        console.log(`Bankruptcy insurance button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="airHelp--false"] is exist then click it
      const airHelpButton = document.querySelector(
        '[data-testid="airHelp--false"]'
      );

      if (airHelpButton && !airHelpButton.hasAttribute("data-clicked")) {
        airHelpButton.click();
        airHelpButton.setAttribute("data-clicked", "true");
        console.log(`Air help button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="baggageService--false"] is exist then click it
      const baggageServiceButton = document.querySelector(
        '[data-testid="baggageService--false"]'
      );

      if (
        baggageServiceButton &&
        !baggageServiceButton.hasAttribute("data-clicked")
      ) {
        baggageServiceButton.click();
        baggageServiceButton.setAttribute("data-clicked", "true");
        console.log(`Baggage service button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="fastTrack--false"] is exist then click it
      const fastTrackButton = document.querySelector(
        '[data-testid="fastTrack--false"]'
      );

      if (fastTrackButton && !fastTrackButton.hasAttribute("data-clicked")) {
        fastTrackButton.click();
        fastTrackButton.setAttribute("data-clicked", "true");
        console.log(`Fast track button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="sms--false"] is exist then click it

      const smsButton = document.querySelector('[data-testid="sms--false"]');

      if (smsButton && !smsButton.hasAttribute("data-clicked")) {
        smsButton.click();
        smsButton.setAttribute("data-clicked", "true");
        console.log(`SMS button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="mobileTravelPlan--false"] is exist then click it
      const mobileTravelPlanButton = document.querySelector(
        '[data-testid="mobileTravelPlan--false"]'
      );

      if (
        mobileTravelPlanButton &&
        !mobileTravelPlanButton.hasAttribute("data-clicked")
      ) {
        mobileTravelPlanButton.click();
        mobileTravelPlanButton.setAttribute("data-clicked", "true");
        console.log(`Mobile travel plan button clicked. Step: ${stepCount}`);
      }

      // check [data-testid="platinum--false"] is exist then click it

      const platinumButton = document.querySelector(
        '[data-testid="platinum--false"]'
      );

      if (platinumButton && !platinumButton.hasAttribute("data-clicked")) {
        platinumButton.click();
        platinumButton.setAttribute("data-clicked", "true");
        console.log(`Platinum button clicked. Step: ${stepCount}`);
      }

      stepCount = 7;
    }
  }

  // Step 7: Click the "Continue" button to proceed to book now
  {
    if (stepCount === 7) {
      console.log(`Clicking continue button to book now. Step: ${stepCount}`);

      // check [data-testid="bookNow-button"] is exist then click it
      const continueButton = document.querySelector(
        `[data-testid="bookNow-button"]`
      );

      if (continueButton && !continueButton.hasAttribute("data-clicked")) {
        continueButton.click();
        continueButton?.dblclick();
        continueButton.click();
        continueButton?.dblclick();

        continueButton.setAttribute("data-clicked", "true");
        console.log(`Continue button clicked. Step: ${stepCount}`);
      }

      stepCount = 8;
    }
  }
});

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
