const Venue = require("../models/venue");
const Vendor = require("../models/vendor");

exports.showVenues = (req, res) => {
  let city = req.query.city;

  let query = city ? { "contact.city": city } : {};

  Venue.find(query)
    .then(offeredVenues => {
      if (req.query.format === "json") {
        res.json({ offeredVenues: offeredVenues });
      } else {
        res.render("venues", {
          offeredVenues: offeredVenues,
          selectedCity: city || "All"
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};



exports.showVendors = (req, res) => {
  let vendorType = req.query.vendorType || 'All';
  let city = req.query.city || 'All';

  let query = {};
  if (vendorType !== 'All') query.vendorType = vendorType;
  if (city !== 'All') query["contact.city"] = city;

  Vendor.find(query)
    .then(offeredVendors => {
      res.render("vendors", {
        offeredVendors: offeredVendors,
        selectedVendorType: vendorType,
        selectedCity: city
      });
    })
    .catch(err => {
      console.log(err);
    });
};



exports.showBudgetTracker = (req, res) => {
  res.render("budget");
};

exports.showGuestlistManager = (req, res) => {
  res.render("guestlist");
};