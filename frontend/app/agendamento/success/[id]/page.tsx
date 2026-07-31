import BookingHeader from "@/app/components/agendamento/booking/BookingHeader";
import BookingSuccess from "@/app/components/agendamento/booking/BookingSuccess";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { id } = await params;

  return (
    <BookingSuccess
      id={Number(id)}
    />
  );
}