const assert = require('assert');
import validateRegisterRecords  from "../src/app/service/validators";
import { expect } from 'chai';
//import validateRegisterRecords from '../src/app/service/validators.js';
import doctors from "./data/doctors"
import patients from "./data/patients"
import appointments from "./data/appointments"

let obj = {
  doctors: doctors,
  appointments: appointments,
  patients: patients 
}


describe('Records', function () {
  describe('validateRegisterRecords', function () {
    it('should return array records', function () {
      console.pretty(validateRegisterRecords(obj));
      expect(true);
      //assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
