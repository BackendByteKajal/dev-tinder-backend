const cron = require("node-cron");
const { ConnectionRequestModel } = require("../models");
const { POPULATE_FIELDS } = require("../constant");
const { request } = require("express");
const sendMail = require("./sendMail");
const { subDays, startOfDay, endOfDay } = require("date-fns");

// cron.schedule("* * * * * *", async () => {
//   console.log("Hello cron");
//   try {
//     const yesterdayDate = subDays(new Date(), 1);
//     const startDay = startOfDay(yesterdayDate);
//     const endDay = endOfDay(yesterdayDate);
//     console.log("endDay: ", endDay);
//     console.log(new Date());
//     console.log("yesterdayDate: ", yesterdayDate);
//     const pendingRequestOfAllUsers = await ConnectionRequestModel.find({
//       status: "interested",
//       createdAt: { $gte: startDay, $lte: endDay },
//     })
//       .populate(
//         "toUserId",
//         POPULATE_FIELDS.USER_POPULATE_FIELDS + " " + "emailId"
//       )
//       .populate("fromUserId", POPULATE_FIELDS.USER_POPULATE_FIELDS)
//       .select("toUserId");

//     // pendingRequestOfAllUsers.forEach((request) => {
//     //   console.log("request: ", request);
//     //   sendMail(request);
//     // });

//     const emailIds = [
//       ...new Set(
//         pendingRequestOfAllUsers.map((request) => request.toUserId.emailId)
//       ),
//     ];
//     sendMail(emailIds)
//   } catch (error) {
//     console.log(error);
//   }
// });
