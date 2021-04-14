module.exports = function(RED) {

	function battery_remoteNode(config) {
		RED.nodes.createNode(this,config);
        this.pulse_interval = config.pulse_interval;
        this.pulses = config.pulses;
        this.pulse_length = config.pulse_length;
        this.time_meter = config.time_meter;

		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "battery_remote",
                payload: {
                    attributes: [
                        { pulse_interval:  parseInt(node.pulse_interval) },
                        { pulses:  parseInt(node.pulses) },
                        { pulse_length:  parseInt(node.pulse_length) },
                        { time_meter:  parseInt(node.time_meter) },

                    ],
                }
            };
       
            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			node.send(msg);
		});
	}
	RED.nodes.registerType("battery_remote", battery_remoteNode);
}