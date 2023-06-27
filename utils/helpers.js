module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },

  // time_elapsed: (date) => {
  //   let x, timeElapsed;
  //   const currentDate = new Date();
  //   const timeDifference = (currentDate.getTime() - date.getTime()) / 1000 / 60;
  //   if (timeDifference >= 60) {
  //     x = Math.ceil(timeDifference / 60);
  //     timeElapsed = `${x} minutes ago`;
  //   } else if (timeDifference >= 3600) {
  //     x = Math.ceil(timeDifference / 3600);
  //     timeElapsed = `${x} hours ago`;
  //   } else if (timeDifference >= 86400) {
  //     x = Math.ceil(timeDifference / 86400);
  //     timeElapsed = `${x} days ago`;
  //   }
  //   return timeElapsed;
  // },
};
