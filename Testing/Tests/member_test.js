const Member = require('../../server/resources/members/schema'),
  mongoose = require('mongoose'),
  assert = require('assert');


let mem;

describe('Member Schema Unit Tests', function () {

  before(function (done) {
    mongoose.connect('mongodb://nick:nicknick123@ds113580.mlab.com:13580/sapa')
    done();
  });


  beforeEach(() => {
    mem = new Member({
      email: 'testing',
      password: 'test',
      level: 1
    });
    mem.save()
      .then(() => done());
  });

  describe('Creating a member', () => {
    it('creates a member', (done) => {
      assert(!mem.isNew);
      done();
    });
  });

  describe('Finding Member by email', () => {
    it('finds member with email', (done) => {
      Member.findOne({ email: 'testing' })
        .then((member) => {
          assert(member.email === 'testing');
          done();
        });
    })
  })

  describe('Deleting a member', () => {
    it('removes a member', (done) => {
      Member.findOneAndRemove({ email: 'member' })
        .then(() => Member.findOne({ email: 'member' }))
        .then((member) => {
          assert(member === null);
          done();
        });
    });
  })

  describe('Updating a member', () => {
    it('updates a member using id', (done) => {
      Member.findByIdAndUpdate(mem._id, { email: 'newEmail' }, { new: true })
        .then((member) => {
          assert(member._doc.email === 'newEmail');
          done();
        });
    });
  })

  afterEach(function (done) {
    if (mem._id) {
      Member.remove({ _id: mem._id }).exec(function () {
        done();
      });
    } else {
      done();
    }
  });


})