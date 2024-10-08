`timescale 1ns / 1ps

module Add1BCDCounter(
    output reg [3:0] out,
    output reg carryOut,
    input wire clk,
    input wire reset
    );
    
    always @(posedge clk or posedge reset) begin
        if (reset)
            out <= 0;
        else if (out == 9) begin
            out <= 0;
            carryOut <= 1;
        end else begin
            out <= out + 1;
            carryOut <= 0;
        end
    end
endmodule
