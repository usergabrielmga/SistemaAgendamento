import BookingFlow from "../components/agendamento/booking/BookingFlow";
import BookingHeader from "../components/agendamento/booking/BookingHeader";
import BookingStepper from "../components/agendamento/booking/BookingStepper";

export default function BookingPage() {
  return (
    <div>
      <BookingHeader/>
      <BookingFlow/>
    </div>
  )
}