const express = require('express')
const FAQcontroller = require('./FAQ.controller')

const FAQrouting = express.Router()

FAQrouting.route('/createFAQ').post(FAQcontroller.createFAQ)
FAQrouting.route('/getFAQ').get(FAQcontroller.getFAQ)
FAQrouting.route('/updateFAQ/:id').put(FAQcontroller.updateFAQ)
FAQrouting.route('/deleteFAQ/:id').delete(FAQcontroller.deleteFAQ)

module.exports = FAQrouting