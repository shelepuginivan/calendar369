export const userStatus = (username) => {
    const teachers = ['Тхостов Константин Эдуардович', 'Волченкова Наталья Ивановна', 'Герда Елена Анатольевна', 'Гремяченская Татьяна Владимировна', 'Гюнинен Ирина Валерьевна', 'Дымбовская Светлана Николаевна', 'Ехлакова Татьяна Петровна', 'Ильина Евгения Валерьевна', 'Ильина Наталия Николаевна', 'Карась Наталья Владимировна', 'Кирилова Виктория Александровна', 'Коробкина Юлия Леонидовна', 'Короленко Наталья Леонидовна', 'Курганникова Майя Николаевна', 'Левых Марина Ивановна', 'Лямина Вера Александровна', 'Нестерова Ксения Николаевна', 'Поволоцкая Ирина Викторовна', 'Сакирданова Наталья Анатольевна', 'Сенина Наталья Алексеевна', 'Смирнова Наталья Витальевна', 'Смирнова Оксана Владимировна', 'Степанова Раиса Вячеславовна', 'Тимофеева Ольга Владимировна', 'Тимошенко Марина Николаевна', 'Флюстикова Светлана Николаевна', 'Чернаускас Светлана Владимировна', 'Вардашева Марина Сергеевна', 'Величко Ирина Сергеевна', 'Кузьменко Юлия Алексеевна', 'Абрамова Карина Юрьевна', 'Алексеева Галина Алексеевна', 'Аленина Юлия Валерьевна', 'Алискерова Фарида Магомедафисовна', 'Альшанская Ольга Владимировна', 'Алябьева Виктория Петровна', 'Андреева Надежда Аркадьевна', 'Антоненко Илья Игоревич', 'Антончук Марина Николаевна', 'Антропова Евгения Олеговна', 'Арефьев Игорь Юрьевич', 'Архангельская Ирина Александровна', 'Ачилдиева Татьяна Александровна', 'Бадьминова Валентина Бамбаевна', 'Бакланова Наталья Юрьевна', 'Баранова Татьяна Николаевна', 'Бисова Ольга Вячеславовна', 'Борина Наталия Олеговна', 'Бороздунова Ксения Александровна', 'Бурмаченко Ирина Владимировна', 'Валикова Мария Сергеевна', 'Вахрушев Валерий Алексеевич', 'Веселов Виталий Сергеевич', 'Веселова Александра Викторовна', 'Востриков Святослав Юрьевич', 'Вострокнутова Любовь Николаевна', 'Глотова Жанна Павловна', 'Глухов Андрей Евгеньевич', 'Горская Елена Витальевна', 'Григорьева Алина Александровна', 'Груденкова Елена Николаевна', 'Гусева Прасковья Андреевна', 'Данилюк Елена Сергеевна', 'Дарьина Диана Витальевна', 'Демидова Ольга Сергеевна', 'Дмитриев Денис Витальевич', 'Дубинина Олеся Михайловна', 'Дубкова Елена Олеговна', 'Дудник Ирина Григорьевна', 'Емельяненко Надежда Алексеевна', 'Етгеут Светлана Николаевна', 'Ефименко Елизавета Анатольевна', 'Жаркова Елена Анатольевна', 'Жендубаев Азамат Дыльдахмедович', 'Жилинская Елена Игоревна', 'Жужома Дарья Алексеевна', 'Заварухина Татьяна Анатольевна', 'Зарина Изабелла Владимировна', 'Зигункова Ирина Михайловна', 'Золотарева Анна Сергеевна', 'Иванов Максим Юрьевич', 'Иванченко Елена Анатольевна', 'Ильина Ксения Алексеевна', 'Исмагилова Анна Владимировна', 'Казакова Лилия Валерьевна', 'Камашева Лариса Александровна', 'Капышева Татьяна Владиславовна', 'Керимова Сафура Ильгаровна', 'Кинслер Екатерина Владимировна', 'Кирст Елена Васильевна', 'Киселева Елена Александровна', 'Клементьева Наталия Александровна', 'Козлова Елена Александровна', 'Козловская Алена Александровна', 'Колосовская Марина Константиновна', 'Коршунов Антон Сергеевич', 'Корюкаев Евгений Степанович', 'Костина Ольга Юрьевна', 'Кравчук Надежда Александровна', 'Крижановская Елена Александровна', 'Кровяков Павел Александрович', 'Крючкова Ольга Сергеевна', 'Кузьмичева Ирина Федоровна', 'Кулигина Елена Николаевна', 'Кунаева Светлана Александровна', 'Курочка Ганна Юрьевна', 'Логвиненко Алексей Владимирович', 'Лукашева Любовь Геннадиевна', 'Лыкова Алина Николаевна', 'Львовский Юрий Волькович', 'Макаренко Юлия Викторовна', 'Макарцов Константин Викторович', 'Малиновская Марина Николаевна', 'Малькова Тамара Александровна', 'Меньшакова Евгения Валерьевна', 'Мидина Ирина Юрьевна', 'Микерникова Наталья Николаевна', 'Михайлова Людмила Валентиновна', 'Муртаев Алишер Нурханжанович', 'Мухина Юлия Анатольевна', 'Нарушко Елена Аркадьевна', 'Наумкина Надежда Вячеславовна', 'Нефедова Ольга Васильевна', 'Нечаева Ольга Владимировна', 'Никитина Светлана Владимировна', 'Никитушкина Марина Викторовна', 'Николаева Ирина Николаевна', 'Никонова Любовь Сергеевна', 'Образцова Светлана Александровна', 'Ордина Ксения Владимировна', 'Орлова Ольга Николаевна', 'Оруджян Елена Арутюновна', 'Павлова Наталья Николаевна', 'Пальмова Ольга Александровна', 'Пиражкова Татьяна Александровна', 'Пирогова Марина Викторовна', 'Полникова Марина Юрьевна', 'Потапова Антонина Игоревна', 'Приходченко Евгения Юрьевна', 'Проявкин Александр Александрович', 'Пчелкин Константин Сергеевич', 'Расчетова Наталия Ивановна', 'Резник Светлана Владимировна', 'Родионова Анна Николаевна', 'Рудеева Юлия Сергеевна', 'Рябова Ирина Юрьевна', 'Салита Жанна Станиславовна', 'Саргсян Лусине Артаваздовна', 'Семенов Александр Александрович', 'Семенов Даниил Юрьевич', 'Семенова Ольга Валерьевна', 'Симкин Владимир Игоревич', 'Скоринова Юлия Валентиновна', 'Скотников Вадим Борисович', 'Смирнова Людмила Владимировна', 'Смирнова Надежда Федоровна', 'Соколова Елена Ивановна', 'Соколова Тамара Леонидовна', 'Соколова Юлия Александровна', 'Соловьева Наталья Евгеньевна', 'Спирин Владимир Ильич', 'Стаховская Вероника Владимировна', 'Стильбанс Наталья Валерьевна', 'Суворова Ольга Александровна', 'Тилинина Маргарита Николаевна', 'Тихонова Марина Владимировна', 'Топорова Елена Валерьевна', 'Тортунов Евгений Владимирович', 'Тупольская Елена Николаевна', 'Тутуркина Галина Валентиновна', 'Федорова Татьяна Викторовна', 'Феоктистова Лариса Анатольевна', 'Фетисова Светлана Евгеньевна', 'Филиппова Галина Валериевна', 'Хайриева Елена Вячеславовна', 'Хаткутова Ольга Викторовна', 'Холодович Мария Леонидовна', 'Цемик Светлана Александровна', 'Цолиган Юрий Васильевич', 'Черкунова Наталья Борисовна', 'Черникова Наталья Михайловна', 'Черных Светлана Олеговна', 'Чернявская Валерия Васильевна', 'Чистова Татьяна Владимировна', 'Чуглина Тамара Алексеевна', 'Шайхетдинова Ольга Васильевна', 'Шилин Сергей Николаевич', 'Шкарина Ольга Геннадьевна', 'Шпак Ирина Игоревна', 'Щербакова Полина Александровна', 'Юрин Дмитрий Сергеевич', 'Яковлева Ольга Григорьевна', 'Якурнова Екатерина Владимировна', 'Якушева Вероника Сергеевна', 'Ярыгина Наталья Викторовна']
    return teachers.includes(username) ? 'teacher' : 'student'
};