import React from "react";
import "./App.css";

const TreeDiagram = () => {
    return (
        <div className="tree">
            <ul>
                <li>
                    <div className="node">
                        <img src="https://images.unsplash.com/photo-1717501805972-6f44905bc53c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                        <p>Username1</p>
                    </div>
                    <ul>
                        <li>
                            <div className="node">
                                <img src="https://images.unsplash.com/photo-1717501805972-6f44905bc53c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                                <p>Username2</p>
                            </div>
                            <ul>
                                <li>
                                    <div className="node">
                                        <img src="https://images.unsplash.com/photo-1717501805972-6f44905bc53c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                                        <p>Username3</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="node">
                                        <img src="https://images.unsplash.com/photo-1717501805972-6f44905bc53c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                                        <p>Username4</p>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="node">
                                <img src="https://images.unsplash.com/photo-1717501805972-6f44905bc53c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                                <p>Username5</p>
                            </div>
                            <ul>
                                <li>
                                    <div className="node">
                                        <img src="https://images.unsplash.com/photo-1717501805972-6f44905bc53c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                                        <p>Username6</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="node">
                                        <img src="https://images.unsplash.com/photo-1717501805972-6f44905bc53c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                                        <p>Username7</p>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default TreeDiagram;
