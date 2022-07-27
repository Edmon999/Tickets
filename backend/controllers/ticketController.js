const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get a tickets
// @route GET /api/tickets
// @access public

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc get a ticket
// @route GET /api/tickets/:id
// @access public

const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  res.status(200).json(ticket);
});

// @desc delete a ticket
// @route DELETE /api/tickets/:id
// @access public

const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }

  await ticket.remove();
  res.status(200).json({ success: true });
});

// @desc update a ticket
// @route PUT /api/tickets/:id
// @access public

const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedTicket);
});

// @desc create a ticket
// @route  POST /api/tickets
// @access public

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add product and description");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(200).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
