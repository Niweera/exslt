const main = () => {
  try {
    let list = document.getElementsByClassName("sc-dnqmqq jZsdgY");
    const data = [];
    for (let item of list) {
      data.push(item.innerText);
    }

    const peak_usage = parseFloat(
      data[0].split(" Used of ")[0].replace("GB", "")
    );
    const total_peak_data = parseFloat(
      data[0].split(" Used of ")[1].replace("GB", "")
    );

    const total_usage = parseFloat(
      data[1].split(" Used of ")[0].replace("GB", "")
    );
    const total_data = parseFloat(
      data[1].split(" Used of ")[1].replace("GB", "")
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

    list[0].innerText = `
    ${list[0].innerText}

    Free day data: 
    Free night data: 
    Free total data: 
    
    Used day data: 
    Used night data: 
    Used total data: 
    
    Free day quota: 
    Free night quota: 
    Free total quota: 
    `;

    list[1].innerText = `
     ${list[1].innerText}

     ${free_day_data} GB of ${total_peak_data} GB
     ${free_night_data} GB of ${(total_data - total_peak_data).toFixed(1)} GB
     ${free_total_data} GB of ${total_data} GB
    
     ${peak_usage} GB of ${total_peak_data} GB
     ${(total_usage - peak_usage).toFixed(1)} of ${(
      total_data - total_peak_data
    ).toFixed(1)} GB
     ${total_usage} GB of ${total_data} GB
    
     ${free_day_data_quota} GB
     ${free_night_data_quota} GB
     ${free_total_data_quota} GB
     `;
  } catch (err) {
    console.log(err.message);
  }
};

const observer = new MutationObserver((mutations, mutiationInstance) => {
  let list = document.getElementsByClassName("sc-dnqmqq jZsdgY");
  if (list.length === 2) {
    main();
    mutiationInstance.disconnect();
    return;
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
