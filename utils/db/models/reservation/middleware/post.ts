import { NextApiRequest, NextApiResponse } from "next";
import Reservation from "../Reservation";
import { ReservationType, GuestType } from "../Reservation";
import { Duration, add, sub } from "date-fns";
import Table, { TableType } from "../../table/Table";

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const guestInfo: GuestType = req.body;

  const overlappingReservations = await filterReservationByDuration(guestInfo, {
    hours: 4,
  });

  if (!overlappingReservations.length) {
    //IMPLEMENT
  }

  const sameGuest = findDuplicateGuestByDuration(
    overlappingReservations,
    guestInfo,
    { hours: 4 }
  );
  if (sameGuest) {
    return res.status(409).json({ existingReservation: sameGuest.guest.date });
  }

  const unavailableTables = findUnavailableTables(
    overlappingReservations,
    guestInfo
  );

  const availableTable = await findAvailableTable(unavailableTables, guestInfo);
  if (!availableTable) {
    return res.status(404).json({ msg: "No available table found" });
  }

  const newReservation = await Reservation.create({
    table: availableTable,
    guest: guestInfo,
  });
  
  return res.status(201).json({ data: newReservation });
}

function getDateRangeByDuration(date: Date, duration: Duration) {
  return {
    min: sub(date, duration),
    max: add(date, duration),
  };
}

async function filterReservationByDuration(
  guestInfo: GuestType,
  duration: Duration
) {
  const requestedDate = new Date(guestInfo.date);
  const searchDateRange = getDateRangeByDuration(requestedDate, duration);

  return (await Reservation.find({
    "guest.date": { $gt: searchDateRange.min, $lt: searchDateRange.max },
  }).populate("table")) as ReservationType[] | [];
}

function findDuplicateGuestByDuration(
  reservations: ReservationType[] | [],
  guestInfo: GuestType,
  duration: Duration
) {
  const requestedDate = new Date(guestInfo.date);
  const searchDateRange = getDateRangeByDuration(requestedDate, duration);

  return reservations.find(
    (r) =>
      r.guest.mobile === guestInfo.mobile &&
      new Date(r.guest.date) > searchDateRange.min &&
      new Date(r.guest.date) < searchDateRange.max
  );
}

function findUnavailableTables(
  reservations: ReservationType[],
  guestInfo: GuestType
) {
  const requestedDate = new Date(guestInfo.date);
  const timeOverlapRange = getDateRangeByDuration(requestedDate, { hours: 2 });

  const unavailableTables: TableType[] = [];
  for (let reservation of reservations) {
    if (
      (reservation.table.capacity >= guestInfo.guestNumber &&
        new Date(reservation.guest.date) >= timeOverlapRange.min) ||
      new Date(reservation.guest.date) <= timeOverlapRange.max
    ) {
      unavailableTables.push(reservation.table);
    }
  }
  return unavailableTables;
}

async function findAvailableTable(
  unavailableTables: TableType[],
  guestInfo: GuestType
) {
  const capacityFilteredTables = await Table.find({
    capacity: { $gte: guestInfo.guestNumber },
  });

  return capacityFilteredTables.find(
    (table) =>
      !unavailableTables.map((t) => t.tableNumber).includes(table.tableNumber)
  );
}
