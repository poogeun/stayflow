package com.stayflow.backend.guest.repository;

import com.stayflow.backend.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {

}
