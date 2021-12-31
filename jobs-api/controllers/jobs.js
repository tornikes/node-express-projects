const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).send({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const job = await Job.findOne({
    createdBy: req.user.userId,
    _id: req.params.id,
  });

  if (!job) {
    throw new NotFoundError(`No job with Id ${req.params.id}`);
  }

  res.send(job);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).send(job);
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company and position fields are required");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with Id ${req.params.id}`);
  }
  res.send(job);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with Id ${req.params.id}`);
  }
  res.status(200).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
