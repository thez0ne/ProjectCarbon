use actix_web::{get, post, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn home() -> impl Responder {
    HttpResponse::Ok().body("Zooweemama")
}

#[post("/ree")]
async fn ree(req: String) -> impl Responder {
    HttpResponse::Ok().body(req)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("REEEEE");
    HttpServer::new(|| {
        App::new()
            .service(home)
            .service(ree)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
