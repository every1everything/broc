package com.management.repository;

import com.management.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by veroo on 2017-02-15.
 */
public interface UserRepository extends JpaRepository<UserModel, Integer> {}
