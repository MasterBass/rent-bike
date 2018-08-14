import {database} from './database';

class ReservationApi {

    static reserveBike(userId, reserve, successHandler, errorHandler) {

        const bikeReserveRef =
            database.ref('/bikes/' + reserve.bikeId + '/reservations');


        bikeReserveRef.transaction(function (reservations) {
            if (reservations === null) {
                return {
                    [reserve.id]:
                        {
                            start: reserve.start,
                            end: reserve.end
                        }
                }
            } else {
                for (let j = 0; j < Object.keys(reservations).length; j++) {
                    if (!reservations[Object.keys(reservations)[j]].isCancelled) {
                        if (reservations[Object.keys(reservations)[j]].start >= reserve.start &&
                            reservations[Object.keys(reservations)[j]].start <= reserve.end) {
                            return;
                        }
                        if (reservations[Object.keys(reservations)[j]].end >= reserve.start &&
                            reservations[Object.keys(reservations)[j]].end <= reserve.end) {
                            return;
                        }

                        if (reservations[Object.keys(reservations)[j]].start <= reserve.start &&
                            reservations[Object.keys(reservations)[j]].end >= reserve.end) {
                            return;
                        }
                    }
                }

                return {...reservations, [reserve.id]:
                    {
                        start: reserve.start,
                        end: reserve.end
                    }
                }
            }
        }, function (error, committed, snapshot) {
            if (error) {
                errorHandler(error);
            } else if (!committed) {
                errorHandler(new Error("Bike already booked for these dates!"));
            } else {

                database.ref('/users/' + userId + '/reservations/')
                    .update({
                        [reserve.id]:
                            {
                                start: reserve.start,
                                end: reserve.end,
                                id: reserve.id,
                                model: reserve.model,
                                location: reserve.location,
                                bikeId: reserve.bikeId
                            }
                    }).then(() => {
                    successHandler();
                }).catch((error) => {
                    errorHandler(error);
                })

            }
        });
    }

    static cancelReserve(userId, reserve) {
        let updates = {};
        updates['/bikes/' + reserve.bikeId + '/reservations/' + reserve.id + '/isCancelled'] = true;
        updates['/users/' + userId + '/reservations/' + reserve.id + '/isCancelled'] = true;
        return database.ref().update(updates);
    }

    static rateReserve(userId, reserve, reserveRate, bikeRate, successHandler, errorHandler) {

        const rateReserveRef =
            database.ref('/users/' + userId + '/reservations/' + reserve.id + '/rate');

        rateReserveRef.transaction(function (currentRate) {
            if (currentRate === null) {
                return reserveRate;
            } else {
                return; // Abort the transaction.
            }
        }, function (error, committed, snapshot) {
            if (error) {
                errorHandler(error);
            } else if (!committed) {
                errorHandler(new Error("Reserve already rated!"));
            } else {
                const bikeRateRef =
                    database.ref('/bikes/' + reserve.bikeId + '/rate');

                bikeRateRef.transaction(function (currentBikeRate) {
                    if (currentBikeRate === null) {
                        return {
                            scores: reserveRate,
                            votes: 1
                        }
                    } else {
                        return {
                            scores: currentBikeRate.scores + reserveRate,
                            votes: currentBikeRate.votes + 1
                        };
                    }
                }, function (error, committed, snapshot) {

                    if (error) {
                        errorHandler(error);
                    } else {
                        successHandler(snapshot.val());
                    }
                });
            }
        });

    }

}

export default ReservationApi;
