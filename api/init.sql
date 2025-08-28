INSERT INTO users (id, "firstName", "lastName", email, password, "imgSrc", roles, "stripeCustomerId") VALUES
  ('e3222a9e-93a9-41cf-a6ef-b590b2b8c288', 'Marcin', 'Mroczek', 'marcin.mroczek@example.com', '$2a$12$qudaA/6xQXnF7.1uH3CabOcRu66gMMPnTUk8LouMLoRUtteHns56C', 'users/151163db-9c09-4a97-afd2-4fc7be096037.jpg', '{USER,COACH}', 'cus_ScLfW1AnFrVxpn');

INSERT INTO cities (id, name, room, "citySrc", "roomSrc", "mapSrc", "priceListSrc") VALUES
  ('e3222a9e-93a9-41cf-a6ef-b590b2b8c289', 'Bochnia', 'Sala Treningowa', 'cities/1.jpg', 'rooms/1.jpg', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2566.498894626296!2d20.421993399999998!3d49.964501899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47163b493ed17fb3%3A0xb95ba8c0c37111f0!2sSzko%C5%82a%20Podstawowa%20nr%205!5e0!3m2!1spl!2spl!4v1751626895716!5m2!1spl!2spl', 'priceLists/1.png');

INSERT INTO coaches (id, "facebookUrl", "instagramUrl", "userId", "cityId") VALUES
  ('e3222a9e-93a9-41cf-a6ef-b590b2b8c290', 'https://www.facebook.com/profile.php?id=100008282384516', 'https://www.instagram.com/marcinmroczek_/', 'e3222a9e-93a9-41cf-a6ef-b590b2b8c288', 'e3222a9e-93a9-41cf-a6ef-b590b2b8c289');