const main = (div) => {
  try {
    const peak_usage = parseFloat(
      div[0].innerText.split(" USED OF ")[0].replace("GB", "")
    );
    const total_peak_data = parseFloat(
      div[0].innerText.split(" USED OF ")[1].replace("GB", "")
    );

    const total_usage = parseFloat(
      div[1].innerText.split(" USED OF ")[0].replace("GB", "")
    );
    const total_data = parseFloat(
      div[1].innerText.split(" USED OF ")[1].replace("GB", "")
    );

    const days_of_current_month = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    const today = new Date().getDate();
    const days_left = days_of_current_month - today + 1;

    const free_day_data = (total_peak_data - peak_usage).toFixed(1);
    const free_total_data = (total_data - total_usage).toFixed(1);
    const free_night_data = (free_total_data - free_day_data).toFixed(1);

    const free_day_data_quota = (free_day_data / days_left).toFixed(1);
    const free_night_data_quota = (free_night_data / days_left).toFixed(1);
    const free_total_data_quota = (free_total_data / days_left).toFixed(1);

    div[0].innerText = `
    ${div[0].innerText} \n ${div[1].innerText}

    Free day data: ----> ${free_day_data} GB of ${total_peak_data} GB
    Free night data: ----> ${free_night_data} GB of ${(
      total_data - total_peak_data
    ).toFixed(1)} GB
    Free total data: ----> ${free_total_data} GB of ${total_data} GB
    
    Used day data: ----> ${peak_usage} GB of ${total_peak_data} GB
    Used night data: ----> ${(total_usage - peak_usage).toFixed(1)} of ${(
      total_data - total_peak_data
    ).toFixed(1)} GB
    Used total data: ----> ${total_usage} GB of ${total_data} GB
    
    Free day quota: ----> ${free_day_data_quota} GB
    Free night quota: ----> ${free_night_data_quota} GB
    Free total quota: ----> ${free_total_data_quota} GB
    `;
  } catch (err) {
    console.log(err);
  }
};

const re_run = () => {
  let div = document.getElementsByClassName("used-of");
  if (div.length === 2) {
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
};

const observer = new MutationObserver((mutations, mutiationInstance) => {
  let div = document.getElementsByClassName("used-of");
  let name = document.getElementsByClassName("name");

  if (div.length === 2 && name[0]?.innerText === "Standard") {
    main(div);
    mutiationInstance.disconnect();
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});

window.addEventListener("click", re_run);
