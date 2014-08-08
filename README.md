The Los Angeles Ruby Study group is interested in visualizing what
happens in Rack middleware stacks. Eventually we would love to figure
out how to inspect an arbitrary Rack stack - perhaps even follow
requests and responses on the fly. But for the moment, we are just
trying to build a static visualization of the middleware stack in an
out-of-the-box Rails 4 application as documented in this ROR Guide:
http://guides.rubyonrails.org/rails_on_rack.html#internal-middleware-stack

This project uses Raphael JS to build animated graphics of different
request/response cycles.
