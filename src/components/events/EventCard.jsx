import React from "react";
import { Eye, Wallet } from "lucide-react";
import { Button } from "../ui/button";

const EventCard = ({ event }) => (
  <div className="bg-softbg shadow-sm mb-4 p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <div className="text-left">
        <h3 className="font-semibold text-lg">{event.name}</h3>
        <p className="text-gray-600 text-sm">{event.date}</p>
      </div>
      <div className="gap-2 grid grid-cols-2 grid-rows-2">
        <Button
          variant="outline"
          className="bg-gold hover:bg-gold/90 md:px-6 text-white"
        >
          <Eye className="md:mr-2 w-4 h-4" />
          <span className="md:inline hidden">View</span>
        </Button>
        <Button
          variant="outline"
          className="bg-gray-800 hover:bg-gray-700 md:px-6 text-white"
        >
          <Wallet className="md:mr-2 w-4 h-4" />
          <span className="md:inline hidden">Wallet</span>
        </Button>
        <p
          className="justify-self-end col-span-2 bg-bluePrimary/70 hover:bg-bluePrimary/80 mx-2 my-1 p-1 rounded-md max-w-32 font-mono text-ellipsis text-lightgray text-sm whitespace-nowrap overflow-hidden"
          title={event.id}
        >
          {event.id}
        </p>
      </div>
    </div>
  </div>
);

export default EventCard;
