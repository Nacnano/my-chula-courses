`timescale 1ns / 1ns


module singlePulser(
    output reg d,
    input pushed,
    input clk
    );
    
    reg state;
    // 0 for unpushed
    // 1 for pushed and still pushed
    
    initial state=0;
    
    always @(posedge clk) begin
        d=0;
        case({pushed,state})
            2'b00: ;
            2'b01: state=0;
            2'b10: begin state=1; d=1; end // 1 only one clock
            2'b11: ;
        endcase
    end
    
    
endmodule