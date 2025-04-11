<!DOCTYPE html>
<html lang="{{ site.lang | default: "en-US" }}">
<head>
  <meta charset='utf-8'>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,maximum-scale=2">
  <link rel="stylesheet" type="text/css" media="screen" href="{{ '/assets/css/style.css?v=' | append: site.github.build_revision | relative_url }}">
{% seo %}
  {% include head-custom.html %}
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      background-color: white !important;
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
    .outer {
      width: 100%;
      max-width: 100%;
      padding: 0;
      margin: 0;
      background-color: transparent !important;
    }
    #header_wrap {
      background-color: #a85903 !important;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      padding-top: 30px;
      padding-bottom: 30.5px;
      overflow: hidden; /* Zapobiega wystawaniu kwadratów */
    }
    #header_wrap .inner {
      width: 100%;
      max-width: 1200px;
      padding: 0 20px;
      position: relative;
      left: 260px;
      text-align: left;
      /* Ukrywamy oryginalny nagłówek */
      visibility: hidden;
    }
    #project_title {
      font-size: 42px;
      margin-top: 20px;
      text-align: left;
      margin-left: 0;
      position: relative;
      left: 0px;
      color: white;
    }
    #project_tagline {
      font-size: 24px;
      margin-top: 10px;
      text-align: left;
      margin-left: 0;
      position: relative;
      left: 0px;
      color: white;
    }
    
    /* Nowy kontener title-square-container */
.title-square-container {
  position: absolute;
  top: 28px; /* Kontrolowanie położenia w pionie */
  left: 49.68%; /* Wycentrowanie w poziomie */
  transform: translateX(-50%);
  width: 100%; /* Pełna szerokość w ramach max-width */
  max-width: 650px; /* Maksymalna szerokość */
  height: 150px; /* Wysokość kontenera - możesz zmienić */
  z-index: 10;
}

/* Nowy styl dla nagłówka w kontenerze title-square-container */
.title-square-container .header-content {
  position: absolute;
  top: 2.5px; /* Kontrolowanie położenia w pionie */
  left: 10px; /* Kontrolowanie położenia w poziomie */
  z-index: 10;
}

/* Style dla nagłówka w nowym kontenerze, zachowujące oryginalne style */
.title-square-container #title {
  font-size: 42px;
  margin-top: 20px;
  text-align: left;
  margin-left: 0;
  position: relative;
  left: 0px;
  color: white;
}

.title-square-container #tagline {
  font-size: 24px;
  margin-top: 10px;
  text-align: left;
  margin-left: 0;
  position: relative;
  left: 0px;
  color: white;
  font-weight: normal !important;
}

/* Usunięcie pseudoelementów, które mogłyby tworzyć podkreślenie */
.title-square-container #tagline::after,
.title-square-container #tagline::before {
  content: none !important;
  display: none !important;
}
    
    /* Nowy niebieski kwadrat w prawym górnym rogu */
    .title-square-container .blue-square {
      width: 45px;
      height: 45px;
      background-color: #d17a1b;
      position: absolute;
      top: 0;
      right: 0;
    }
    
    /* Nowe niebieskie kwadraty w kontenerze title-square-container */
    .title-square-container .blue-square1 {
      width: 24px;
      height: 24px;
      background-color: #d17a1b;
      position: absolute;
      top: 51.5px; /* Możesz kontrolować położenie w pionie */
      right: 63px; /* Możesz kontrolować położenie w poziomie */
    }
    
    .title-square-container .blue-square2 {
      width: 24px;
      height: 24px;
      background-color: #d17a1b;
      position: absolute;
      top: 31px; /* Możesz kontrolować położenie w pionie */
      right: 107px; /* Możesz kontrolować położenie w poziomie */
    }
    
    .title-square-container .blue-square-big {
      width: 175px;
      height: 30px;
      background-color: #d17a1b;
      position: absolute;
      top: 60px; /* Możesz kontrolować położenie w pionie */
      left: 0px; /* Możesz kontrolować położenie w poziomie */
    }
    
    /* Media queries dla różnych szerokości ekranu */
    @media screen and (max-width: 1200px) {
      /* Dostosowujemy pozycję kontenera z tytułem */
      #header_wrap .inner {
        left: 150px; /* Dostosuj tę wartość do swoich potrzeb */
      }
    }
    
    /* Media queries dla telefonów z proporcjonalnym położeniem kwadratów */
    @media screen and (max-width: 768px) {
      /* Style dla kontenera z tytułem - zachowujemy te same proporcje jak dla komputera */
      #header_wrap .inner {
        left: 0px; /* Dostosowany do urządzeń mobilnych */
        width: calc(100% - 60px); /* Zapewnienie, że tekst się zmieści */
      }
      
      /* Zachowujemy taki sam rozmiar czcionki jak na komputerze */
      #project_title, #title {
        font-size: 42px;
      }
      
      #project_tagline, #tagline {
        font-size: 24px;
      }
    }
    
    /* Dodatkowe style dla małych telefonów */
    @media screen and (max-width: 480px) {
      /* Radykalne resetowanie pozycji kontenera z tytułem */
      #header_wrap {
        padding-left: 0;
        padding-right: 0;
        justify-content: flex-start; /* Wyrównanie do lewej */
      }
      
      #header_wrap .inner {
        left: 0;
        right: auto;
        margin-left: 0;
        padding-left: 10px; /* Minimalny padding, aby tekst nie przylegał do krawędzi */
        width: 100%;
        max-width: 100%;
        transform: none;
        justify-content: flex-start;
      }
      
      #project_title, #title {
        font-size: 32px;
        margin-left: 0;
        padding-left: 0;
        left: 0;
        width: 100%;
        text-align: left;
      }
      
      #project_tagline, #tagline {
        font-size: 24px;
        margin-left: 0;
        padding-left: 0;
        left: 0;
        width: 100%;
        text-align: left;
      }
      
      .outer {
        padding: 0;
        margin: 0;
        max-width: 100%;
        width: 100%;
      }
    }
    
    /* Dodatkowe media query dla orientacji poziomej na telefonach */
    @media screen and (max-width: 900px) and (orientation: landscape) {
      /* Dostosowanie położenia kontenera z tytułem dla orientacji poziomej */
      #header_wrap .inner {
        left: 80px;
        width: calc(100% - 100px);
      }
    }
    
    /* Zaktualizowane style dla menu - zgodne z poprzednią stroną */
    #myMenu {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      padding: 20px 0;
      margin-top: 0 !important;
      margin-bottom: 60px;
      width: 100%;
      position: relative;
      top: 21px; /* Kontrola położenia w pionie */
      z-index: 100;
    }
    
    #myMenu a.menu-option {
      color: rgb(115, 115, 115);
      text-decoration: none;
      padding: 5px 10px;
      margin: 0 15px;
      font-size: 18px;
      transition: color 0.3s;
      white-space: nowrap;
    }
    
    #myMenu a.menu-option:hover {
      color: #a85903;
    }
    
    /* Style responsywne dla menu */
    @media screen and (max-width: 768px) {
      #myMenu {
        flex-direction: column;
        align-items: center;
      }
      
      #myMenu a.menu-option {
        margin: 5px 0;
      }
    }
    
    #main_content_wrap {
      background-color: white !important;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      border: none;
    }
    #main_content {
      width: 100%;
      max-width: 1200px;
      padding: 0 20px;
    }
    
    /* Zaktualizowane style dla dolnej belki (footer) */
    #footer_wrap {
      background-color: #a85903 !important;
      width: 100%;
      display: flex;
      justify-content: center;
      height: auto;
      padding-top: 27.75px;
      padding-bottom: 27.75px;
      position: relative;
    }
    #footer_wrap .inner {
      width: 100%;
      max-width: 1200px;
      padding: 0 20px;
      position: relative;
      left: 260px;
      text-align: center;
    }
    #footer_wrap p {
      margin: 5px 0;
      position: relative;
      left: 0px;
      top: 0px;
    }
    #footer_wrap .copyright {
      position: relative;
      top: 0px;
      left: 0px;
    }
    
    /* New styles for middle columns */
    #middle_content_wrap, #second_middle_content_wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      background-color: white;
      border: none;
    }
    #middle_content, #second_middle_content {
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
    .middle_column {
      width: 30%;
      background-color: white;
      padding: 20px;
    }
    /* New styles for bottom containers */
    #bottom_content_wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      background-color: #f4f4f4;
      border: none;
      border-top: none !important;
      border-bottom: none !important;
      overflow: hidden;
      position: relative;
    }
    #bottom_content_wrap::before,
    #bottom_content_wrap::after {
      content: none !important;
    }
    #bottom_content {
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      position: relative;
      z-index: 10;
    }
    .bottom_column {
      width: 48%;
      background-color: white;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    /* New styles for image and text section */
    #image_text_content_wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      background-color: white;
      border: none;
    }
    #image_text_content {
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
    .image_column {
      width: 48%;
      background-color: white;
      padding: 20px;
    }
    .text_column {
      width: 48%;
      background-color: white;
      padding: 20px;
    }
    .image_placeholder {
      width: 100%;
      height: 400px;
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #888;
      font-size: 18px;
    }

    /* Dodatkowe style dla strony ryzyko-modeli */
    .model-risk-header {
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 2px solid #a85903;
    }

    .model-risk-section {
      margin-bottom: 40px;
    }

    .model-risk-section h3 {
      color: #a85903;
      margin-bottom: 15px;
    }

    .model-risk-image {
      width: 100%;
      max-width: 800px;
      margin: 20px auto;
      display: block;
      border: 1px solid #eee;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .model-risk-quote {
      font-style: italic;
      padding: 15px;
      background-color: #f9f5f0;
      border-left: 4px solid #a85903;
      margin: 20px 0;
    }

    .model-risk-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }

    .model-risk-table th {
      background-color: #a85903;
      color: white;
      padding: 10px;
      text-align: left;
    }

    .model-risk-table td {
      border: 1px solid #ddd;
      padding: 10px;
    }

    .model-risk-table tr:nth-child(even) {
      background-color: #f9f5f0;
    }

    .title-square-container h2#tagline,
    .title-square-container h2[id="tagline"],
    .title-square-container .header-content h2,
    h2#tagline {
      border-bottom: none !important;
      text-decoration: none !important;
      box-shadow: none !important;
      background-image: none !important;
      font-weight: normal !important;
      color: white !important;
      position: relative !important;
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
    }

    /* Ukrycie wszystkich możliwych pseudoelementów */
    .title-square-container h2#tagline::after,
    .title-square-container h2#tagline::before,
    .title-square-container h2[id="tagline"]::after,
    .title-square-container h2[id="tagline"]::before,
    .title-square-container .header-content h2::after,
    .title-square-container .header-content h2::before,
    h2#tagline::after,
    h2#tagline::before {
      content: none !important;
      display: none !important;
      visibility: hidden !important;
      border: none !important;
      background: none !important;
      position: static !important;
      width: 0 !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      text-decoration: none !important;
      box-shadow: none !important;
    }
    
  </style>
</head>
<body>
  <!-- HEADER -->
  <div id="header_wrap" class="outer">
    <!-- Nowy kontener title-square-container -->
    <div class="title-square-container">
      <!-- Przeniesiony nagłówek -->
      <div class="header-content">
        <h1 id="title">{{ site.title | default: site.github.repository_name }}</h1>
        <h2 id="tagline">{{ site.description | default: site.github.project_tagline }}</h2>
      </div>
      
      <div class="blue-square"></div>
      <div class="blue-square1"></div>
      <div class="blue-square2"></div>
      <div class="blue-square-big"></div>
    </div>
    
    <!-- Oryginalny header pozostawiony, ale ukryty przez CSS -->
    <header class="inner">
      <h1 id="project_title">{{ site.title | default: site.github.repository_name }}</h1>
      <h2 id="project_tagline">{{ site.description | default: site.github.project_tagline }}</h2>
    </header>
  </div>
  
  <!-- Menu będzie teraz wstawiane z index.md przez Jekyll -->
  
  <!-- MAIN CONTENT -->
  <div id="main_content_wrap" class="outer">
    <section id="main_content" class="inner">
      {{ content }}
    </section>
  </div>
  
  <!-- MODEL RISK SPECIFIC CONTENT -->
  <div id="middle_content_wrap">
    <div id="middle_content">
      <div class="middle_column">
        <h3>Definicje Ryzyka Modeli</h3>
        <p>Ryzyko modeli to potencjalne straty wynikające z błędów w projektowaniu, implementacji lub stosowaniu modeli analitycznych w procesach decyzyjnych instytucji finansowych.</p>
      </div>
      <div class="middle_column">
        <h3>Komponenty Ryzyka</h3>
        <p>W mojej praktyce wyróżniam trzy główne komponenty ryzyka modeli: ryzyko danych, ryzyko metodologii oraz ryzyko implementacji i stosowania modelu.</p>
      </div>
      <div class="middle_column">
        <h3>Zarządzanie Ryzykiem Modeli</h3>
        <p>Skuteczne zarządzanie ryzykiem modeli wymaga systematycznego podejścia obejmującego inwentaryzację modeli, ich walidację, monitoring oraz ustalenie jasnych ról i odpowiedzialności.</p>
      </div>
    </div>
  </div>
  
  <!-- MODEL RISK BOTTOM CONTENT -->
  <div id="bottom_content_wrap">
    <div id="bottom_content">
      <div class="bottom_column">
        <h3>Studium Przypadku</h3>
        <p>Analiza rzeczywistych przypadków materializacji ryzyka modeli pokazuje, że najczęstszymi przyczynami są nieuwzględnione zmiany w otoczeniu biznesowym, błędy w danych wejściowych oraz niewłaściwa interpretacja wyników modelu przez użytkowników końcowych.</p>
      </div>
      <div class="bottom_column">
        <h3>Najlepsze Praktyki</h3>
        <p>W oparciu o doświadczenia z sektora bankowego rekomendujemy podejście oparte na proporcjonalności, gdzie intensywność kontroli ryzyka modeli jest dostosowana do materialności modelu i jego wpływu na procesy biznesowe.</p>
      </div>
    </div>
  </div>
  
  <!-- FOOTER  -->
  <div id="footer_wrap" class="outer">
    <footer class="inner">
      {% if site.github.is_project_page %}
      <p class="copyright">Maintained by <a href="{{ site.github.owner_url }}">Maciej Buczak</a></p>
      {% endif %}
    </footer>
  </div>
  
  <!-- Skrypt do wykrywania przeglądarki -->
  <script>
    // Funkcja do wykrywania przeglądarki
    function detectBrowser() {
      const userAgent = navigator.userAgent;
      const html = document.documentElement;
      
      if (userAgent.indexOf("Firefox") > -1) {
        html.classList.add("browser-firefox");
      } else if (userAgent.indexOf("Edg") > -1) {
        html.classList.add("browser-edge");
      } else if (userAgent.indexOf("Chrome") > -1) {
        html.classList.add("browser-chrome");
      } else if (userAgent.indexOf("Safari") > -1) {
        html.classList.add("browser-safari");
      } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
        html.classList.add("browser-ie");
      } else {
        html.classList.add("browser-other");
      }
      
      // Debug - pokaż w konsoli wykrytą przeglądarkę
      console.log("Wykryta przeglądarka:", html.className);
    }
    
    // Uruchom natychmiast po załadowaniu skryptu
    detectBrowser();
    
    // I ponownie po pełnym załadowaniu strony (na wszelki wypadek)
    window.addEventListener('load', detectBrowser);
  </script>
</body>
</html>
