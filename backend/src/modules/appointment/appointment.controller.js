const Appointment = require('./appointment.model');

// 1. Book New Appointment
exports.bookAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;

    // Check if slot already booked for this doctor (Optional but good)
    const existing = await Appointment.findOne({ doctorId, appointmentDate, appointmentTime });
    if (existing) {
      return res.status(400).json({ success: false, message: "This slot is already booked!" });
    }

    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime
    });

    res.status(201).json({ success: true, data: newAppointment });
  } catch (error) {
    next(error);
  }
};

// 2. Get Patient's Appointments
exports.getPatientAppointments = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'name specialization') // Doctor ki info bhi saath laao
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
};

// 3. Get Doctor's Appointments (Dashboard ke liye)
exports.getDoctorAppointments = async (req, res, next) => {
  try {
    const { doctorId } = req.params;

    // Console lagao taaki backend terminal mein dikhe ki call aa rahi hai
    console.log("🔍 Fetching appointments for Doctor ID:", doctorId);

    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'name email') // Patient ka naam dashboard par dikhane ke liye
      .sort({ appointmentDate: 1, appointmentTime: 1 }); // Date wise sort karo

    console.log(`✅ Found ${appointments.length} appointments`);

    res.status(200).json({ 
      success: true, 
      data: appointments 
    });
  } catch (error) {
    next(error);
  }
};

// 4. Update Appointment Status
exports.updateStatus = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};